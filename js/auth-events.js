const Events = require('minivents');

const SIGNIN_EVENT_NAME = "signin";
const SIGNOUT_EVENT_NAME = "signout";

let events = new Events();

function onSignIn(callback) {
  events.on(SIGNIN_EVENT_NAME, callback);
}

function onSignOut(callback) {
  events.on(SIGNOUT_EVENT_NAME, callback);
}

function signIn() {
  events.emit(SIGNIN_EVENT_NAME);
}

function signOut() {
  events.emit(SIGNOUT_EVENT_NAME);
}

module.exports = {
  onSignIn,
  onSignOut,
  signIn,
  signOut
};
