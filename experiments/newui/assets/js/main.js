(function(window, require) {

    "use strict";

    var jqVersion = '1.8.1';

    var config = {
        paths: {
            jquery: [
                '//ajax.googleapis.com/ajax/libs/jquery/'+jqVersion+'/jquery.min',
                'vendor/jquery-'+jqVersion+'.min'
            ],

            codemirror: 'vendor/codemirror/codemirror',
            'cm-runmode': 'vendor/codemirror/runmode',
            'cm-jsmode': 'vendor/codemirror/modes/javascript',
            'cm-xmlmode': 'vendor/codemirror/modes/xml'

        },
        shim: {
            codemirror: {
                exports: 'CodeMirror'
            },
            'cm-runmode': ['codemirror'],
            'cm-jsmode': ['codemirror'],
            'cm-xmlmode': ['codemirror']
        }
    };

    var location = window.location;

    if (location.protocol === 'file:' || location.hostname === 'localhost') {
        config.paths.jquery = 'vendor/jquery-'+jqVersion;
    }

    require.config(config);
    require(['labs'], function(Labs) {});

})(window, require);
