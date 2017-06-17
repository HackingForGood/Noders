const mdc = require('material-components-web/dist/material-components-web');
const SetupPage = require('./setup-page');

SetupPage().then(() => {
  let drawerEl = document.querySelector(".mdc-persistent-drawer");
  let drawer = new mdc.drawer.MDCPersistentDrawer(drawerEl);
  document.querySelector(".drawer-toggle").addEventListener("click", () => {
    drawer.open = !drawer.open;
  });
});
