define(['jquery', 'exercises'], function($, Exercises) {

    "use strict";

    function Labs() {
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
