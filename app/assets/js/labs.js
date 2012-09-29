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
            this.$window.on(
                'hashchange',
                window.location,
                $.proxy(this.onHashChange, this)
            ).trigger('hashchange');
        },

        onHashChange: function(evt) {
            var hash = this.parseHash(evt.data.hash);
            var category = hash.category;
            var appview = this.appview;
            var collection = this.collection;

            if (!category) {
                appview.slideTo('index');
                return;
            }

            if (!collection[category]) {

                collection.fetch(
                    category,
                    'assets/exercises/' + category + '.xml'
                );

            }

            appview.prepareStartScreen(hash);
            appview.slideTo('exercise');

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
