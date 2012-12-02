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
        this.$iframe = $('#sandbox');
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
        },

        prepareIframe: function() {
            this.iframeWindow = this.$iframe[0].contentWindow;
            this.iframeBody = this.iframeWindow.document.body;
            this.iframeStyles = $('#sandbox-styles')[0].cloneNode(true);
            this.iframeScript = $('script[data-requiremodule=jquery]')[0].cloneNode();

            var head = this.iframeWindow.document.getElementsByTagName('head')[0];

            head.appendChild(this.iframeStyles);
            head.appendChild(this.iframeScript);
        }

    };

    return AppView;

});
