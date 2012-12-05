define(['jquery', 'exercises', 'appview'], function($, Exercises, AppView) {

    "use strict";

    function Labs() {
        this.collection = new Exercises();
        this.appview = null;
        this.currentCategory = null;
        this.currentExercise = null;
    }

    Labs.prototype = {

        start: function() {
            // Assumes that document is ready.
            this.appview = new AppView();
            this.attachListeners();

            // TODO Delay execution of these two methods to before showing the
            // exercise view.
            this.appview.setDimensions();
            this.appview.prepareIframe();
        },

        attachListeners: function() {
            var self = this;
            var appview = this.appview;
            var $window = appview.$window;

            $window.on(
                'hashchange',
                window.location,
                $.proxy(this.onHashChange, this)
            ).trigger('hashchange');

            $window.on(
                'resize',
                $.proxy(this.appview.setDimensions, this.appview)
            );

            appview.$exercise.on(
                'click',
                'a.button',
                function(e) {
                    e.preventDefault();
                    var hash = '/' + self.currentCategory;
                    hash += '/' + self.currentExercise;
                    window.location.hash = hash;
                }
            );
        },

        onHashChange: function(evt) {
            var self = this;
            var hash = this.parseHash(evt.data.hash);
            var category = hash.category;
            var appview = this.appview;
            var collection = this.collection;
            var maybeFetch;

            if (!category) {
                appview.slideTo('index');
                return;
            }

            maybeFetch = $.Deferred().resolve();

            if (!collection[category]) {

                // TODO Delay execution to start of exercise (when user clicks
                // on "start" button).
                maybeFetch = collection.fetch(
                    category,
                    'assets/exercises/' + category + '.xml'
                );

            }

            maybeFetch.done(function() {
                self.currentCategory = category;
                self.currentExercise = 0;
            });

            appview.prepareStartScreen(hash);
            appview.slideTo('exercise');

            if ( !isNaN(hash.exercise) ) {
                appview.startExercise();
            } else {
                appview.endExercise();
            }

        },

        parseHash: function(hash) {
            hash = hash.split('/');
            return {
                category: hash[1],
                exercise: parseInt((hash[2]), 10)
            };
        }

    };

    return Labs;

});
