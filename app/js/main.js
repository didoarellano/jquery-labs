(function(window, require) {

    "use strict";

    var config = {
        paths: {
            jquery: [
                '//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min',
                'vendor/jquery-1.8.1.min'
            ]
        }
    };

    var location = window.location;

    if (location.protocol === 'file:' || location.hostname === 'localhost') {
        config.paths = {
            jquery: 'vendor/jquery-1.8.1'
        };
    }

    require.config(config);
    require(['labs'], function(labs) {
        labs.init();
    });

})(window, require);
