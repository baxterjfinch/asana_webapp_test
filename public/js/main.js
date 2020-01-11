import {HomePage} from './partials/home_partial.js';
import {IsAuthorized} from './partials/is_authorized.js';
import {ApiLogin} from './partials/api_login.js';
import {UserData} from './partials/user_data.js';
import {Projects} from './partials/projects.js';
import {Workspaces} from './partials/workspaces.js';

import {CallApiWorkplaces, CallGetProject} from './api/api.js';

export class MainPage {
  constructor(selector) {
    this._dom = document.getElementById(selector);
    this.is_authenticated = false;
    this._main_container_dom = null;
    this._selected_workspace = null;
    this._selected_project = null;
    this._loaded_workspace_projects = [];
  }

  Render() {
    this._render();
    this._main_container_dom = document.getElementById('main_container');

    this._render_auth = new IsAuthorized('is_authorized', false)
    this._render_auth.Render();

    this._render_api_login = new ApiLogin('action_box');
    this._render_api_login.Render();

    this._renderEventListeners();
  }

  _render() {
    this._dom.innerHTML = `
      <div id="main_container" class="main-container">
        <!-- <div id="action_box" class="action-box" contenteditable="true" placeholder="Enter your API Key"></div> -->
        <div id="action_box" class="action-box"></div>
        <div id="user_data" class="user-data"></div>
        <div id="workspaces_box" class="workspaces-box"></div>
        <div id="projects_box" class="projects-box"></div>
        <div id="is_authorized" class="is-authorized-container"></div>
      <div>
    `;
  }

  _unselect_project() {
    if (document.getElementById(this._selected_project)) {
      document.getElementById(this._selected_project).style.backgroundColor = "transparent";
    }
  }

  _select_project(project) {
    this._selected_project = project;
    document.getElementById(this._selected_project).style.backgroundColor = "rgba(89, 94, 110, 0.48)";

  }

  _unselect_workspace() {
    document.getElementById(this._selected_workspace).style.backgroundColor = "transparent";
  }

  _select_workspace(workspace) {
    this._selected_workspace = workspace;
    // document.getElementById(this._selected_workspace).style.backgroundColor = "rgba(89, 94, 110, 0.48)";
  }

  _renderEventListeners() {
    document.addEventListener("authenticatedEvent", (e) => {
      if (e.detail.is_authenticated) {
        document.getElementById('projects_box').classList.add('project-data-authed');
        document.getElementById('workspaces_box').classList.add('workspace-data-authed');
        this.api_key = e.detail.api_key;

        this._render_projects = new Projects('projects_box', [], this.api_key);
        this._render_projects.Render();

        this._render_auth = new IsAuthorized('is_authorized', true)
        this._render_auth.Render();

        this._render_user_data = new UserData('user_data', e.detail.user)
        this._render_user_data.Render();

        this._workspaces = new Workspaces('workspaces_box', e.detail.user.data.workspaces)
        this._workspaces.Render();
      } else {
        console.log(":(")
      }
    });

    document.addEventListener("selectWorkspaceEvent", (e) => {
      if (e.detail.workspace !== this._selected_workspace) {
        console.log("Selecting ", e.detail.workspace);
        if (this._selected_workspace !== null) {
          console.log("Unselecting ", this._selected_workspace);
          this._unselect_workspace();
        }

        this._select_workspace(e.detail.workspace);
        console.log("Newly Selected ", e.detail.workspace);

        if(!this._loaded_workspace_projects.includes(e.detail.workspace)) {
          if(!this._loaded_workspace_projects.includes(this._selected_workspace)) {
            this._loaded_workspace_projects.push(this._selected_workspace);
          }

          CallApiWorkplaces(this.api_key, e.detail.workspace).then((f) => {
            console.log(f);
            this._render_projects.RenderProjects(document.getElementById(`${e.detail.workspace}_projects`), f.data);
          });
        }
      }
    });

    document.addEventListener("selectProjectEvent", (e) => {

      if (this._selected_project) {
        this._unselect_project();
      }

      this._select_project(e.detail.project);

      CallGetProject(this.api_key, e.detail.project).then((f) => {
        console.log(this._render_projects);
        this._render_projects.RenderSelectedProject(f.data, e.detail.color1, e.detail.color2);

      });

    });
  }
}
