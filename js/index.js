const mdc = require('material-components-web/dist/material-components-web');
const SetupPage = require('./setup-page');

function waitForHaven() {
  return new Promise(function(resolve, reject) {
    if(window.haven.loading) {
      window.haven.firebaseScriptInjectLoaded = resolve;
    } else {
      resolve();
    }
  });
}

function setupLoggedInUi(user) {
  document.querySelector(".login-button").style.display = 'none';
  document.querySelector(".user-area").removeAttribute('style');
  loadUser(user);
}

function setupLoggedOutUi() {
  document.querySelector(".user-area").style.display = 'none';
  document.querySelector(".login-button").removeAttribute('style');
}

function loadUser(user) {
  document.querySelector(".user-area-name").innerHTML = user.name;
}

function login() {
  return new Promise(function(resolve, reject) {
    window.Firebase.requestAuthentication(resolve, reject);
  });
}

function logout() {
  window.Firebase.signOut();
  setupLoggedOutUi();
}

SetupPage().then(() => {
  let drawerEl = document.querySelector(".mdc-persistent-drawer");
  let drawer = new mdc.drawer.MDCPersistentDrawer(drawerEl);
  document.querySelector(".drawer-toggle").addEventListener("click", () => {
    drawer.open = !drawer.open;
  });

  let menu = new mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
  document.querySelector(".user-area-name").addEventListener("click", () => {
    menu.open = !menu.open;
  });

  document.querySelector(".logout-button").addEventListener("click", () => {
    logout();
  });

  waitForHaven().then(() => {
    let Firebase = window.Firebase;
    if(Firebase.isLoggedIn()) {
      setupLoggedInUi(Firebase.getCurrentUser());
    }

    document.querySelector(".login-button").addEventListener("click", () => {
      login().then((user) => {
        setupLoggedInUi(user);
      });
    });

  });
});
