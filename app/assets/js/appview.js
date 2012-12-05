define(['jquery'], function($) {

    "use strict";

    function AppView() {
        this.$window = $(window);
        this.body = document.body;
        this.$container = $('.container');
        this.$exercise = this.$container.find('.exercise');

        // TODO Candidates for lazy loading
        this.$index = this.$container.find('.index');
        this.$views = this.$exercise.find('.views');
        this.$sidebar = this.$container.find('.sidebar');
        this.$startScreens = this.$exercise.find('.startscreen article');
        this.$visibleStartScreen = $([]);
        this.$iframe = $('#sandbox');
        this.$pre = this.$exercise.find('pre');
        this.$instructions = this.$sidebar.find('.instructions');
        this.$context = this.$exercise.find('.context');
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
            // TODO Candidate for lazy function definition pattern, "caching"
            // $sidebar(?) $views(?), sidebarWidth.
            this.sideBarWidth = this.sideBarWidth || this.$sidebar.innerWidth();
            var dimensions = {
                width:  this.$window.width() - this.sideBarWidth,
                height: this.body.offsetHeight
            };

            this.$sidebar.height(dimensions.height);
            this.$views.css(dimensions);
        },

        prepareIframe: function() {
            // TODO Candidate for lazy function definition pattern, "caching"
            // iframeWindow & iframeBody.

            this.iframeWindow = this.$iframe[0].contentWindow;
            this.iframeBody = this.iframeWindow.document.body;
            this.iframeStyles = $('#sandbox-styles')[0].cloneNode(true);

            // this.iframeScript = $('script[data-requiremodule=jquery]')[0].cloneNode();
            // The .cloneNode way above doesn't work, i.e. iframeWindow.jQuery
            // is undefined. I'm not sure if it's a same domain thing or if
            // cloning script elements doesn't work like I want it to. Either
            // way, creating a new script element, copying the src property from
            // the target jquery script tag, and appending to head works
            // (manually tested on Chrome and Firefox).

            this.iframeScript = document.createElement('script');
            this.iframeScript.src = $('script[data-requiremodule=jquery]')[0].src;

            var head = this.iframeWindow.document.getElementsByTagName('head')[0];

            head.appendChild(this.iframeStyles);
            head.appendChild(this.iframeScript);
        }

    };

    return AppView;

});
