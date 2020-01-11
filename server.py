from classes import *
from flask import Flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

api.add_resource(Profile, "/user/<string:key>") #Done
api.add_resource(Projects, "/projects/<string:key>") #Done
api.add_resource(Project, "/project/<string:key>") #Done
# api.add_resource(Workspaces, "/workspaces")
# api.add_resource(Workspace, "/workspace/<string:key>")
app.run(debug=True)
