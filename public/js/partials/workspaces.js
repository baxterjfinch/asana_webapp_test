export class Workspaces {
  constructor(selector, data) {
    this._dom = document.getElementById(selector);
    this.workspaces = data;
  }

  Render() {
    this._renderWorkspaces();
    // this._renderEventListeners();
  }

  _renderWorkspaces() {
    this._dom.innerHTML += this._renderHeader();
    for (let i = 0; i < this.workspaces.length; i++) {
      setTimeout(() =>{
        let workspace = new Workspace(this.workspaces[i])
        this._dom.innerHTML += workspace.Render();
        workspace.RenderEventListeners();

        if (i === 0) {
          workspace.SelectWorkspace();
        }
      }, 50);

    }
  }

  _renderHeader() {
    return `
      <div class="workspace-header">Workspaces</div>
    `;
  }
}

class Workspace {
  constructor(workspace) {
    this.id = workspace.id;
    this.name = workspace.name;
  }

  RenderEventListeners() {
    console.log("setting listner", this.id)

    setTimeout(() =>{
      document.getElementById(`${this.id}`).addEventListener('click', () => {
        let event = new CustomEvent("selectWorkspaceEvent", {
          detail: {
            workspace: this.id,
          }
        });

        document.dispatchEvent(event);
      });
    }, 50);
  }

  SelectWorkspace() {
    let event = new CustomEvent("selectWorkspaceEvent", {
      detail: {
        workspace: this.id,
      }
    });

    document.dispatchEvent(event);
  }

  Render() {
    let color1 = '#'+Math.floor(Math.random()*16777215).toString(16);
    let color2 = '#'+Math.floor(Math.random()*16777215).toString(16);

    return `
      <div id=${this.id} class="workspace">
        <div class="workspace-orb" style="background-image: linear-gradient(34deg, ${color1}, ${color2}); width: 25px; height: 25px; display: inline-block; border-radius: 100px;"></div>
        <div class="workspace-name">${this.name}</div>
        <div id="${this.id}_projects" class="workspace-projects"></div>
      </div>
    `;
  }
}
