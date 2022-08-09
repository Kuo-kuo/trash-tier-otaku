from urllib import response
from flask import Flask, jsonify, request, Response
from flask_restful import Api, Resource

from dotenv import load_dotenv
from os import getenv

import db
import psycopg2

import secrets

from json import dumps

app = Flask(__name__)
api = Api(app)

load_dotenv()
client_id = getenv('CLIENT_ID')
client_secret = getenv('CLIENT_SECRET')

def get_db_conn():
    conn = psycopg2.connect(
        host = db.HOST,
        database = db.DATABASE,
        user = db.DB_USER,
        password = db.DB_PASSWORD
    )
    return conn

def get_new_code_verifier() -> str:
    token = secrets.token_urlsafe(100)
    return token[:128]


class Auth(Resource):
    def get(self):
        try:
            client_challenge = get_new_code_verifier()
            conn = get_db_conn()
            cur = conn.cursor()
            
            sql_ins = f'insert into requests(client_challenge) values (\'{client_challenge}\') returning request_id;'

            cur.execute(sql_ins)
            conn.commit()
            request_id = cur.fetchone()[0]
            url = f'https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id={client_id}&code_challenge={client_challenge}&state={request_id}'


        except Exception as e:
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

    def post(self):
        #store the user's auth key with a access token, maybe also pull user's account info to protect from api limit?
        return Response("unfinished", status=501)

class Hello(Resource):
    def get(self):
        data = 'Hello World'

        return {'data' : data }

api.add_resource(Auth, '/auth')
api.add_resource(Hello, '/')

if __name__ == '__main__':
    app.run(debug=True)