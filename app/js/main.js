require.config({
    paths: {
        jquery: 'vendor/jquery-1.8.1'
    }
});

require(['labs'], function(labs) {
    "use strict";
    labs.init();
});
