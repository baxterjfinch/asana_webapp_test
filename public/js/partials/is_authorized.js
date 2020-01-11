export class IsAuthorized {
  constructor(selector, my_bool) {
    this._dom = document.getElementById(selector);
    this._is_authed = my_bool;
  }

  Render() {
    if (this._is_authed) {
      this._dom.innerHTML = `
        <i class="fa fa-check authorized-icon" title="API Authorized"></i>
      `;
    } else {
      this._dom.innerHTML = `
        <i class="fa fa-times-circle not-authorized-icon" title="API Not Authorized"></i>
      `;
    }
  }
}
