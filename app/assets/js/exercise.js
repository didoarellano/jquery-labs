define(function() {

    "use strict";

    return Exercise;

    function Exercise(config) {
        this.iframeName = config.iframeName;
        this.iframePath = config.iframePath || 'assets/exercises';
        this.iframeSrc = this.iframePath + '/' + config.iframeName + '.html';
        this.iframeHTML = '';
        this.cmd = '';
        this.instructions = config.instructions;
        this.selector = config.selector;
    }

});
