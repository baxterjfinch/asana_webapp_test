import json
import requests
from flask_restful import Api, Resource, reqparse

# PseudoDatabase For API Key Storage
storage = {
    "baxter": "0/2351d2a611b7c1ee027c00f0ca93a971"
}

class Profile(Resource):
    def get(self, key):
        URL = "https://app.asana.com/api/1.0/users/me"
        r = requests.get(url = URL, headers={'Authorization': 'Bearer {}'.format(storage[key])})

        data = r.json()
        return data

class Projects(Resource):
    def get(self, key):
        URL = "https://app.asana.com/api/1.0/workspaces/{}/projects".format(key)
        r = requests.get(url = URL, headers={'Authorization': 'Bearer {}'.format(storage["baxter"])})

        data = r.json()
        return data

class Project(Resource):
    def get(self, key):
        URL = "https://app.asana.com/api/1.0/projects/{}".format(key)
        r = requests.get(url = URL, headers={'Authorization': 'Bearer {}'.format(storage["baxter"])})

        data = r.json()
        return data
