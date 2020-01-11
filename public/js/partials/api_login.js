export class ApiLogin {
  constructor(selector, my_bool) {
    this._dom = document.getElementById(selector);
  }

  Render() {
    this._renderLoginBox();
    this._renderEventListeners();
  }

  _renderLoginBox() {
    this._dom.innerHTML = `
      <div id="api_login_box" class="api-login-box" contenteditable="true" placeholder="Enter your API Key">0/2351d2a611b7c1ee027c00f0ca93a971</div>
      <div id="submit_api" class="submit-api"><i class="fa fa-arrow-right"></i></div>
    `;
  }

  _renderEventListeners() {
    this._renderSubmit();
  }

  _renderSubmit() {
    let submit = document.getElementById('submit_api');

    // UNCOMMENT TO STOP AUTO-LOGIN
    // submit.addEventListener('click', () => {
      let api_key = document.getElementById('api_login_box').innerText;
      this._callApiAuthenticate(api_key).then((data) => {
        this._minimizeAndClimb(data, api_key);
      }).catch((data) => {
        this._renderFailed(data);
      });
    // });
  }

  _renderFailed(data) {
    console.log(data);
  }

  _minimizeAndClimb(data, api_key) {
    this.api_key = api_key;

    let event = new CustomEvent("authenticatedEvent", {
      detail: {
        api_key: api_key,
        is_authenticated: true,
        user: data
      }
    });

    document.dispatchEvent(event);

    let action_box = document.getElementById('action_box');
    action_box.classList.add('authenticated-api-box');
    document.getElementById('api_login_box').contentEditable = false;
    this._renderHoverEffect();
  }

  _renderHoverEffect() {
    let box = document.getElementById('action_box');
    let api = this.api_key;

    box.innerText = "Connected To Asana";
    box.addEventListener('mouseenter', () => {
      box.innerText = api;
    })

    box.addEventListener('mouseleave', () => {
      box.innerText = "Connected To Asana";
    })
  }

  _callApiAuthenticate(api_key) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: "GET",
        headers: {
          "Authorization": 'Bearer' + api_key
        },
        url: "https://app.asana.com/api/1.0/users/me",
        processData: false,
        success: function(msg) {
          resolve(msg)
        }
      });
    })
  }
}
