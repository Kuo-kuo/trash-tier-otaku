from http import client
from flask import Flask, jsonify, request, Response
from flask_restful import Api, Resource

import requests

from dotenv import load_dotenv
import sys, os
import db
import psycopg2

import secrets

from json import dumps

app = Flask(__name__)
api = Api(app)

load_dotenv()
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')

def get_db_conn():
    conn = psycopg2.connect(
        host = db.HOST,
        database = db.DATABASE,
        user = db.DB_USER,
        password = db.DB_PASSWORD
    )
    return conn

def get_new_code_verifier():
    token = secrets.token_urlsafe(100)
    return token[:128]

class Auth(Resource):
    def get(self):
        try:
            client_challenge = get_new_code_verifier()
            conn = get_db_conn()
            cur = conn.cursor()
            
            ins_secret = f'insert into requests(client_challenge) values (\'{client_challenge}\') returning request_id;'

            cur.execute(ins_secret)
            conn.commit()
            request_id = cur.fetchone()[0]
            url = f'https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id={client_id}&code_challenge={client_challenge}&state={request_id}'


        except Exception as e:
            if (conn):    
                cur.close()
                conn.close()
                
            return Response(
                response=dumps({'error message': str(e)}),
                status=400,
                mimetype='application/json'
            )
        
        if (conn):    
            cur.close()
            conn.close()
            
        return Response(
                response=dumps({'redirect': url}),
                status=200,
                mimetype='application/json'
            )

class Callback(Resource):
    def post(self):
        try:
            data = request.get_json()
            assert data, "didn't pass in params in body"
            assert "auth_code" in data.keys(), "didn't pass user auth code in body"
            assert "request_id" in data.keys(), "didn't pass request id in body"
            auth_code = data["auth_code"]
            request_id = data["request_id"]
            
            conn = get_db_conn()
            cur = conn.cursor()

            check_code = f'select case when exists (select * from users where auth_code = \'{auth_code}\') then TRUE else FALSE end'
            cur.execute(check_code)
            code_exists = cur.fetchone()[0]
            if not code_exists:
                get_secret = f'select client_challenge from requests where request_id = \'{request_id}\''
                cur.execute(get_secret)
                code_verifier = cur.fetchone()[0]

                data = {
                    'client_id': client_id,
                    'client_secret': client_secret,
                    'code': auth_code,
                    'code_verifier': code_verifier,
                    'grant_type': 'authorization_code'
                }
                response = requests.post("https://myanimelist.net/v1/oauth2/token", data=data)

                response.raise_for_status()
                token = response.json()
                
                access_token = token["access_token"]
                refresh_token = token["refresh_token"]
                access_token_expiration = token["expires_in"]
                
                insert_token = f'insert into users(auth_code, access_token, refresh_token, access_token_expiration) values (\'{auth_code}\', \'{access_token}\', \'{refresh_token}\', (CURRENT_TIMESTAMP + interval \'{access_token_expiration} seconds\')) returning user_id'
                print("inserting token")
                cur.execute(insert_token)
                conn.commit()
                print("token inserted")
                user_id = cur.fetchone()[0]
            else:
                grab_id = f'select user_id from users where auth_code = \'{auth_code}\''
                cur.execute(grab_id)
                user_id = cur.fetchone()[0]

            delete_request = f'delete from requests where request_id = \'{request_id}\''
            cur.execute(delete_request)
            conn.commit()
            if (conn):    
                cur.close()
                conn.close()

            return Response(
                response=dumps({'user_id': user_id}),
                status=201,
                mimetype='application/json'
            )    
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            if (conn):    
                cur.close()
                conn.close()
                
            return Response(
                response=dumps({'error message': str(e)}),
                status=400,
                mimetype='application/json'
            )

class Rater(Resource):
    def get(): return

    
api.add_resource(Auth, '/auth')
api.add_resource(Callback, '/callback')
api.add_resource(Rater, '/rater')

if __name__ == '__main__':
    app.run(debug=True)