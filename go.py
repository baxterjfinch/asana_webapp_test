import requests
import json

ACCESS_TOKEN = "0/2351d2a611b7c1ee027c00f0ca93a971"

# Action Functions
def user_info():
    URL = "https://app.asana.com/api/1.0/users/me"
    r = requests.get(url = URL, headers={'Authorization': 'Bearer {}'.format(ACCESS_TOKEN)})

    data = r.json()
    print(data)

def create_project():
    workspace = "1140744475117195"
    project_name = input("Name: ")
    project_notes = input("Notes: ")

    payload = {"data": {"notes": project_notes, "name": project_name}}
    payload = json.dumps(payload)

    URL = "https://app.asana.com/api/1.0/workspaces/{}/projects".format(workspace)
    r = requests.post(url = URL, headers={'Authorization': 'Bearer {}'.format(ACCESS_TOKEN)}, data=payload)

    data = r.json()
    print(data)

def get_projects():
    workspace = "1140744475117195"

    URL = "https://app.asana.com/api/1.0/workspaces/{}/projects".format(workspace)
    r = requests.get(url = URL, headers={'Authorization': 'Bearer {}'.format(ACCESS_TOKEN)})

    data = r.json()
    print(data)

def create_task():
    workspace = "1140744475117195"

    print("Projects Are:\n")
    get_projects()

    task_name = input("Name: ")
    task_notes = input("Notes: ")
    project = input("Copy/Paste the Project ID you want to assign this task to: ")

    payload = {"data": {"notes": task_notes, "name": task_name, "projects": [project]}}
    payload = json.dumps(payload)

    URL = "https://app.asana.com/api/1.0/workspaces/{}/tasks".format(workspace)
    r = requests.post(url = URL, headers={'Authorization': 'Bearer {}'.format(ACCESS_TOKEN)}, data=payload)

    data = r.json()
    print(data)

def get_tasks():
    workspace = "1140744475117195"

    print("Projects Are:\n")
    get_projects()

    project = input("Copy/Paste the Project ID you want to assign this task to: ")
    URL = "https://app.asana.com/api/1.0/projects/{}/tasks".format(project)
    r = requests.get(url = URL, headers={'Authorization': 'Bearer {}'.format(ACCESS_TOKEN)})

    data = r.json()
    print(data)

# Helper Function
def do_thing_with(action):
    switcher = {
        "1": create_project,
        "2": get_projects,
        "3": create_task,
        "4": get_tasks,
        "5": user_info
    }
    func = switcher.get(action, lambda: "Invalid Action")
    # Execute the function
    func()

action = input("1. Create Project\n2. Get Projects\n3. Create Task\n4. Get Tasks\n5. Get User Info\n\n>>> ")
