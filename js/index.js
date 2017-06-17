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
  document.querySelectorAll(".login-button").forEach(button => button.style.display = 'none');
  document.querySelectorAll(".user-area").forEach(area => area.removeAttribute('style'));
  loadUser(user);
}

function setupLoggedOutUi() {
  document.querySelectorAll(".user-area").forEach(area => area.style.display = 'none');
  document.querySelectorAll(".login-button").forEach(button => button.removeAttribute('style'));
}

function loadUser(user) {
  document.querySelectorAll(".user-area-name").forEach(area => area.innerHTML = user.name);
  document.querySelectorAll("img.user-image").forEach(img => img.src = user.photo);
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
  document.querySelector("button.user-area-name").addEventListener("click", () => {
    menu.open = !menu.open;
  });

  document.querySelectorAll(".logout-button").forEach(button =>
    button.addEventListener("click", () => {
      logout();
    })
  );

  waitForHaven().then(() => {
    let Firebase = window.Firebase;
    if(Firebase.isLoggedIn()) {
      setupLoggedInUi(Firebase.getCurrentUser());
    }

    document.querySelectorAll(".login-button").forEach(button =>
      button.addEventListener("click", () => {
        login().then((user) => {
          setupLoggedInUi(user);
        });
      })
    );

  });
});
