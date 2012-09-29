define(['jquery'], function($) {

    "use strict";

    function AppView() {
        this.body = document.body;
        this.$container = $('.container');
        this.$index = this.$container.find('.index');
        this.$exercise = this.$container.find('.exercise');
        this.$sidebar = this.$container.find('.sidebar');
        this.$startScreens = this.$exercise.find('.startscreen article');
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
        },

        startExercise: function() {
            this.$exercise.addClass('started');
            this.$sidebar.addClass('show');
        },

        endExercise: function() {
            this.$exercise.removeClass('started');
            this.$sidebar.removeClass('show');
        }

    };

    return AppView;

});
