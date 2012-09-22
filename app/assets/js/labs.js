define(['jquery', 'exercises', 'appview'], function($, Exercises, AppView) {

    "use strict";

    function Labs() {
        this.collection = new Exercises();
        this.appview = new AppView();
        this.currentCategory = '';
        this.currentExercise = null;
    }

    Labs.prototype = {

        parseHash: function(hash) {
            hash = hash.split('/');
            return {
                category: hash[1],
                exercise: parseInt((hash[2]), 10) || 0
            };
        }

    };

    return Labs;

});
