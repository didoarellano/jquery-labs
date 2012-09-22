define(['jquery'], function($) {

    "use strict";

    function AppView() {
        this.body = document.body;
        this.$container = $('.container');
        this.$index = this.$container.find('.index');
        this.$exercise = this.$container.find('.exercise');
    }

    AppView.prototype = {

        gotoExercise: function() {
            console.log('AppView#gotoExercise');
        },

        gotoIndex: function() {
            console.log('AppView#gotoIndex');
        },

        resizeViewPort: function() {
            console.log('AppView#resizeViewPort');
        }

    };

    return AppView;

});
