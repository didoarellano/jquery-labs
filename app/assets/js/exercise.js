define(['jquery'], function($) {

    "use strict";

    return Exercise;

    function Exercise(config) {
        /*
         *  Properties:
         *      instructions
         *          - Required in config.
         *          - Will appear as heading in the view.
         *      selector
         *          - Required in config.
         *          - The context which the student's command will be run with.
         *            "Command prefix".
         *      iframeName
         *          - Required in config.
         *      iframePath
         *          - Optional in config.
         *          - Defaults to "assets/exercises"
         *      iframeSrc
         *          - Concatenated from iframePath and iframeName
         *          - The iframe's src attribute.
         *      iframeHTML
         *          - iframe's innerHTML will be saved here, if needed.
         *      cmd
         *          - The student's input ("command").
         */

        this.iframePath = config.iframePath || 'assets/exercises';
        this.iframeSrc = this.iframePath + '/' + config.iframeName + '.html';
        this.iframeHTML = '';
        this.cmd = '';

        $.extend(this, config);
    }

});
