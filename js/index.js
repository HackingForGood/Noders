const mdc = require('material-components-web/dist/material-components-web');

document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  mdc.autoInit();

  let drawerEl = document.querySelector(".mdc-persistent-drawer");
  let drawer = new mdc.drawer.MDCPersistentDrawer(drawerEl);
  document.querySelector(".drawer-toggle").addEventListener("click", () => {
    drawer.open = !drawer.open;
  });
});
