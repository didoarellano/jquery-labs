define(['jquery'], function($) {

    "use strict";

    return Exercise;

    function Exercise(config) {
        this.iframePath = config.iframePath || 'assets/exercises';
        this.iframeSrc = this.iframePath + '/' + config.iframeName + '.html';
        this.iframeHTML = '';
        this.cmd = '';

        $.extend(this, config);
    }

});
