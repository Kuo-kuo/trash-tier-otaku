from flask import Flask, jsonify, request, Response
from flask_restful import Api, Resource

from dotenv import load_dotenv
from os import getenv

from json import dumps

app = Flask(__name__)
api = Api(app)

load_dotenv()
client_id = getenv('CLIENT_ID')
client_secret = getenv('CLIENT_SECRET')


class Auth(Resource):
    def get(self):
        try:
            code_challenge = request.args.get('code_challenge')
            assert code_challenge, "must provide code_challenge"
            assert len(code_challenge) == 128, "code_challenge syntax error"
        except AssertionError as warn:
            return Response(
                response=dumps({'error message': str(warn)}),
                status=400,
                mimetype='application/json'
            )
        except Exception as e: 
            return Response(
                response=dumps({'error message': str(e)}),
                status=400,
                mimetype='application/json'
            )
        url = f'https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id={client_id}&code_challenge={code_challenge}'
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