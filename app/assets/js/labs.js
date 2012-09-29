define(['jquery', 'exercises', 'appview'], function($, Exercises, AppView) {

    "use strict";

    function Labs() {
        this.collection = new Exercises();
        this.appview = new AppView();
        this.currentCategory = '';
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
            var slideTo = category ? 'exercise' : 'index';

            if (this.currentCategory === category) {

                // console.log('load new exercise');

            } else if (this.collection[category]) {

                // category has already been loaded and instatiated

            } else if (category) {

                this.collection.fetch(
                    category,
                    'assets/exercises/' + category + '.xml',
                    function() {
                        // console.log('set this.currentCategory and this.currentExercise');
                        // this.currentCategory = category;
                    }
                );

            }

            if (slideTo === 'exercise') {
                this.appview.prepareStartScreen(hash);
            }

            this.appview.slideTo(slideTo);

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
