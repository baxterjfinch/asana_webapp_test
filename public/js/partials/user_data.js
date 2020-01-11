import {Workspaces} from './workspaces.js';

export class UserData {
  constructor(selector, data) {
    this._dom = document.getElementById(selector);
    this.user = data;
  }

  Render() {
    this._renderUserBox();

    // this._renderEventListeners();
  }

  _renderUserBox() {
    document.getElementById('user_data').classList.add('user-data-authed');
    
    this._dom.innerHTML = `
      <div id="user_data_box" class="user-data-box">
        <div class="user-welcome">Welcome, ${this.user.data.name}</div>
      </div>
    `;
  }
}
