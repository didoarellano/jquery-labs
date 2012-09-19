define(['exercise'], function(Exercise) {

    "use strict";

    function Exercises() {}

    Exercises.prototype = {

        current: { category: null, exercise: null },

        add: function(category, exercises) {
            var len = (exercises && exercises.length) || 0;
            var instances = [];
            var i;
            for (i = 0; i < len; i++) {
                instances.push( new Exercise(exercises[i]) );
            }
            this[category] = instances;
        },

        setCurrent: function(what, setTo) {

            var ret;

            if (typeof what === 'object') {

                this.current.category = this[what.category];
                this.current.exercise = this.current.category[what.exercise];
                ret = this.current;

            } else {

                ret = what === 'category' ?
                      this[setTo] :
                      this.current.category[setTo];

                if (ret) {
                    this.current[what] = ret;
                }

            }

            return ret;
        }

    };

    return Exercises;

});
