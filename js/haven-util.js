
function waitForHaven() {
  return new Promise(function(resolve, reject) {
    if(window.haven.loading) {
      window.haven.firebaseScriptInjectLoaded = resolve;
    } else {
      resolve();
    }
  });
};

module.exports = {
  waitForHaven
};
