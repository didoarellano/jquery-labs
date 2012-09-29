define(['jquery'], function($) {

    "use strict";

    function Exercise(config) {
        /*
         *  Properties:
         *      instructionsheading
         *          - Required in config.
         *          - Will appear as heading in the sidebar.
         *      iframehtml
         *          - Required in config.
         *          - This will be inserted into the iframeView's iframe.
         *      type
         *          - Required in config
         *          - Type will be toggled with a className on .exercise via
         *            the View object
         *          - Three types:
         *              Exercise Type    | property/className
         *              -----------------+--------------------
         *              context.method() | 'method'
         *              $('selectors')   | 'selecting'
         *              CodeMirror       | 'codemirror'
         *      instructionstext
         *          - Optional in config.
         *          - Will appear as paragraphs or any html in the sidebar.
         *      selector
         *          - Optional in config. Defaults to null.
         *          - The context which the student's command will be run with.
         *            "Command prefix".
         *      command
         *          - The student's input ("command").
         */

        var requiredProps = ['type', 'instructionsheading', 'iframehtml'];
        var i = requiredProps.length;
        while (i--) {
            if (config[requiredProps[i]] === undefined) {
                throw new Error('config object needs a(n) ' + requiredProps[i] + ' property.');
            }
        }

        this.selector = null;
        this.command = '';

        $.extend(this, config);
    }

    Exercise.prototype = {
        buildCommand: function(input) {
            var sel = this.selector;
            var command = sel ? '$("' + sel + '")' : '';
            command = command + input;
            this.command = command;
            return command;
        }
    };

    return Exercise;

});
