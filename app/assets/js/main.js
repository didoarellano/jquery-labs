(function(window, require) {

    "use strict";

    var jqVersion = '1.8.1';

    var config = {
        paths: {
            jquery: [
                '//ajax.googleapis.com/ajax/libs/jquery/'+jqVersion+'/jquery.min',
                'vendor/jquery-'+jqVersion+'.min'
            ]
        }
    };

    var location = window.location;

    if (location.protocol === 'file:' || location.hostname === 'localhost') {
        config.paths = {
            jquery: 'vendor/jquery-'+jqVersion
        };
    }

    require.config(config);
    require(['labs'], function(Labs) {
        var labs = new Labs();
        labs.start();
    });

})(window, require);
