import {CallGetProjectTasks} from '../api/api.js';

export class Projects {
  constructor(selector, data, api_key) {
    this._dom = document.getElementById(selector);
    this.projects = data;
    this.api_key = api_key;
  }

  Render() {
    this._renderHeader();
    // this._renderProjectMenu();
    this.RenderProjects(document.getElementById(``), this.projects);
    // this._renderEventListeners();
  }

  RenderProjects(selector, projects) {
    if(selector) {
      selector.innerHTML = ``;
    }

    for (let i = 0; i < projects.length; i++) {
      setTimeout(() =>{
        let project = new Project(projects[i])
        selector.innerHTML += project.Render();
        project.RenderEventListeners();
      }, 50);
    }
  }

  RenderSelectedProject(project, color1, color2) {
    this._renderHeader(project);
    this._renderProjectTasksView(project);
    this.selected_project = new SelectedProject(project, color1, color2);
    this.selected_project.Render(project);
  }

  _renderHeader(project) {
    if(project) {
      this.selected_header = new SelectedProjectHeader(project);
      this._dom.innerHTML = this.selected_header.Render();
      // this.selected_header.RegisterContextMenu();
    }
  }

  _renderProjectTasksView(project) {
    if(project) {
      this.tasks_view = new SelectedProjectsTaskView(project, this.api_key);
      this.tasks_view.GetTasks().then((data) => {
        // this._dom.innerHTML += //data
        console.log(data);
      });
    }
  }

  _renderProjectMenu() {
    this._projectMenu = new ProjectMenu();
    this._dom.innerHTML += this._projectMenu.Render();
    this._projectMenuDom = document.getElementById('project_menu');
  }
}

class SelectedProjectsTaskView {
  constructor(project, api) {
    console.log(project, api);
    this.id = project.id;
    this.api = api;
  }

  GetTasks() {
    return new Promise((resolve, reject) => {
      CallGetProjectTasks(this.id, this.api).then((data) => {
        resolve(data);
      }).catch((err) => {
        console.log(err);
      })
    })
  }
}

class SelectedProjectHeader {
  constructor(project) {
    this.name = project.name;
    this.id = project.id;
    this.created = project.created_at;
    this.followers = project.followers;
    this.owner = project.owner;
  }

  // <div class="selected-project-owner project-header-item">Owner: ${this.owner.name}</div>
  // <div class="selected-project-date project-header-item">Created: ${this.created}</div>
  // <div class="selected-project-followers project-header-item">${this.name}</div>

  RegisterContextMenu() {

  }

  Render() {
    return `
    <div class="projects-header">
      <div id="_project_title" class="project-title">
        <div class="selected-project-title project-header-item">${this.name}</div>
        <div id="project_info" class="selected-project-info"><i class="fa fa-info-circle"></i></div>
      </div>
      <div id="_project_owner" class="project-owner project-circle-class" title="Project Owner">
        <div class="project-owner-circle project-header-item">${this.owner.name.substring(0,2)}</div>
      </div>
      <div id="_project_followers" class="project-followers project-circle-class" title="Followers">
        <div class="followers-circle project-header-item">${this.followers.length}</div>
      </div>
    </div>
    `;
  }
}

class Project {
  constructor(project) {
    this.id = project.id;
    this.name = project.name;
  }

  RenderEventListeners() {
    setTimeout(() =>{
      document.getElementById(`${this.id}`).addEventListener('click', () => {
        let event = new CustomEvent("selectProjectEvent", {
          detail: {
            project: this.id,
            color1: this.color1,
            color2: this.color2
          }
        });

        document.dispatchEvent(event);
      });
    }, 50);


  }

  Render() {
    this.color1 = '#'+Math.floor(Math.random()*16777215).toString(16);
    this.color2 = '#'+Math.floor(Math.random()*16777215).toString(16);

    return `
      <div id=${this.id} class="project">
        <div class="project-orb" style="background-image: linear-gradient(34deg, ${this.color1}, ${this.color2}); width: 25px; height: 25px; display: inline-block; border-radius: 100px;"></div>
        <div class="project-name">${this.name}</div>
      </div>
    `;
  }
}

class ProjectMenu {
  constructor() {
  }

  Render() {
    return `
      <div id="project_menu" class="project-menu">

      </div>
    `;
  }
}

class SelectedProject {
  constructor(project, color1, color2) {
    this.id = project.id;
    this.name = project.name;
    this.created = project.created;
    this.followers = project.followers;
    this.members = project.members;
    this.notes = project.notes;
    this.owner = project.owner;
    this.workspace = project.workspace;
    this.color = project.color;
    this.color1 = color1;
    this.color2 = color2;
  }

  Render() {
    return `
      <div id=${this.id} class="project">
        <div class="project-orb" style="background-color: ${this.color}; width: 25px; height: 25px; display: inline-block; border-radius: 100px;"></div>
        <div class="project-name">${this.name}</div>
      </div>
    `;
  }
}
