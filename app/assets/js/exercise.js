define(['jquery'], function($) {

    "use strict";

    function Exercise(config) {
        /*
         *  Properties:
         *      instructions
         *          - Required in config.
         *          - Will appear as heading in the view.
         *      iframeHTML
         *          - Required in config.
         *          - This will be inserted into the iframeView's iframe.
         *      selector
         *          - Optional in config.
         *          - The context which the student's command will be run with.
         *            "Command prefix".
         *      command
         *          - The student's input ("command").
         */

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
