const authEvents = require('./auth-events');

function signIn() {
  return new Promise(function(resolve, reject) {
    window.Firebase.requestAuthentication(resolve, reject);
  }).then(() => {
    authEvents.signIn();
  });
}

function signOut() {
  window.Firebase.signOut();
  authEvents.signOut();
}

module.exports = {
  signIn,
  signOut
};
