define(['jquery'], function($) {

    "use strict";

    function AppView() {
        this.$window = $(window);
        this.body = document.body;
        this.$container = $('.container');
        this.$index = this.$container.find('.index');
        this.$exercise = this.$container.find('.exercise');
        this.$views = this.$exercise.find('.views');
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
        },

        setDimensions: function() {
            this.sideBarWidth = this.sideBarWidth || this.$sidebar.innerWidth();
            var dimensions = {
                width:  this.$window.width() - this.sideBarWidth,
                height: this.body.offsetHeight
            };

            this.$sidebar.height(dimensions.height);
            this.$views.css(dimensions);
        }

    };

    return AppView;

});
