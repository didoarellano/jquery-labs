define(['jquery'], function($) {

    "use strict";

    function Exercise(config) {
        /*
         *  Properties:
         *      instructions
         *          - Required in config.
         *          - Will appear as heading in the view.
         *      iframehtml
         *          - Required in config.
         *          - This will be inserted into the iframeView's iframe.
         *      selector
         *          - Optional in config.
         *          - The context which the student's command will be run with.
         *            "Command prefix".
         *      command
         *          - The student's input ("command").
         */

        var requiredProps = ['instructions', 'iframehtml'];
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
