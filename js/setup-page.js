const mdc = require('material-components-web/dist/material-components-web');

function SetupPage() {
    return new Promise(function(resolve, reject) {
        document.addEventListener("DOMContentLoaded", function(){
            // Handler when the DOM is fully loaded
            mdc.autoInit();
            resolve();
        });
    });
}

module.exports = SetupPage;
