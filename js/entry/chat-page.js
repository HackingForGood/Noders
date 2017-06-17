const mdc = require('material-components-web/dist/material-components-web');
const SetupPage = require('../setup-page');
const authEvents = require('../auth-events');
const auth = require('../auth');
const havenUtil = require('../haven-util');
const Chat = require('../chat');

SetupPage().then(() => {
  // Page specific setup
  // let drawerEl = document.querySelector(".mdc-persistent-drawer");
  // let drawer = new mdc.drawer.MDCPersistentDrawer(drawerEl);
  // document.querySelector(".drawer-toggle").addEventListener("click", () => {
  //   drawer.open = !drawer.open;
  // });
  //
  // let menu = new mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
  // document.querySelector("button.user-area-name").addEventListener("click", () => {
  //   menu.open = !menu.open;
  // });

  // Authentication
  authEvents.onSignOut(() => {
    document.querySelectorAll(".user-area").forEach(area => area.style.display = 'none');
    document.querySelectorAll(".login-button").forEach(button => button.removeAttribute('style'));
  });

  authEvents.onSignIn(() => {
    document.querySelectorAll(".login-button").forEach(button => button.style.display = 'none');
    document.querySelectorAll(".user-area").forEach(area => area.removeAttribute('style'));
    let user = window.Firebase.getCurrentUser();
    document.querySelectorAll(".user-area-name").forEach(area => area.innerHTML = user.name);
    document.querySelectorAll("img.user-image").forEach(img => img.src = user.photo);
  });

  document.querySelectorAll(".logout-button").forEach(button =>
    button.addEventListener("click", () => {
      auth.signOut();
    })
  );

  havenUtil.waitForHaven().then(() => {
    window.setTimeout(function() {
    let Firebase = window.Firebase;
    if(Firebase.isLoggedIn()) {
      authEvents.signIn();
    }

    document.querySelectorAll(".login-button").forEach(button =>
      button.addEventListener("click", () => {
        auth.signIn();
      })
    );

    Firebase.chat.getActiveChatID(Firebase.getCurrentUser().uid, function(chatId) {
      window.chat = new Chat(Firebase.getCurrentUser(), chatId);
    });
  }, 1000);
  });
});
