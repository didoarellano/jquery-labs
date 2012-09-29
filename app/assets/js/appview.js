define(['jquery'], function($) {

    "use strict";

    function AppView() {
        this.body = document.body;
        this.$container = $('.container');
        this.$index = this.$container.find('.index');
        this.$exercise = this.$container.find('.exercise');
        this.$startScreens = this.$exercise.find('.startscreen > div');

        this.$visibleStartScreen = $([]);
    }

    AppView.prototype = {

        prepareStartScreen: function(hash) {
            var $startScreen = this.$startScreens.filter(function() {
                return $(this).data('category') === hash.category;
            });
            this.$visibleStartScreen.hide();
            this.$visibleStartScreen = $startScreen.show();
        },

        slideTo: function(section) {
            this.body.className = 'on' + section;
        }

    };

    return AppView;

});
