define(['jquery', 'exercises', 'appview'], function($, Exercises, AppView) {

    "use strict";

    function Labs() {
        this.collection = new Exercises();
        this.appview = new AppView();
        this.currentCategory = null;
        this.currentExercise = null;
    }

    Labs.prototype = {

        start: function() {
            // Assumes that document is ready.
            this.cacheSelectors();
            this.attachListeners();
        },

        cacheSelectors: function() {
            this.$window = $(window);
        },

        attachListeners: function() {
            var self = this;

            this.$window.on(
                'hashchange',
                window.location,
                $.proxy(this.onHashChange, this)
            ).trigger('hashchange');

            this.appview.$exercise.on(
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

            maybeFetch= $.Deferred().resolve();

            if (!collection[category]) {

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
