define(['jquery'], function($) {

    "use strict";

    function AppView() {
        this.body = document.body;
        this.$container = $('.container');
        this.$index = this.$container.find('.index');
        this.$exercise = this.$container.find('.exercise');
    }

    AppView.prototype = {

        gotoExercise: function() {},

        gotoIndex: function() {},

        resizeViewPort: function() {}

    };

    return AppView;

});
