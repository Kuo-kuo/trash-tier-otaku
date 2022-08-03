from flask import Flask, jsonify, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Login(Resource):
    def get(self):
        data = "Hello World"
        return jsonify({'data' : data })

api.add_resource(Login, '/auth')
