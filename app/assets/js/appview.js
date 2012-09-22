define(['jquery'], function($) {

    "use strict";

    function AppView() {
        this.body = document.body;
        this.$container = $('.container');
        this.$index = this.$container.find('.index');
        this.$exercise = this.$container.find('.exercise');
    }

    AppView.prototype = {

        slideTo: function(section) {
            this.body.className = 'on' + section;
        },

        resizeViewPort: function() {
            console.log('AppView#resizeViewPort');
        }

    };

    return AppView;

});
