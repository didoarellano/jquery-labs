define(['jquery', 'exercise'], function($, Exercise) {

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
            this[category] = {
                exercises: instances,

                // Keep track of the current exercise here too because the
                // models (or just some data about them) will get saved to
                // local storage eventually.
                currentExerciseIndex: 0

            };
        },

        fetch: function(category, configPath, cb) {

            $.ajax({
                context: this,
                url: configPath,
                dataType: 'xml',
                success: success
            });

            function success(data, status, jqxhr) {
                /*jshint validthis:true*/
                var configs = [];
                var exercises = data.getElementsByTagName('exercise');
                var i = exercises.length;

                while (i--) {
                    configs.push(this._massageToObject(exercises[i]));
                }

                this.add(category, configs);
                cb();
            }

        },

        // This needs to be tested in isolation from #fetch so we expose it.
        _massageToObject: function(el) {
            var obj = {};
            var nodes = el.childNodes;
            var i = nodes.length;
            var node, val, name;

            this._tempDiv = this._tempDiv || document.createElement('div');

            while (i--) {
                node = nodes[i];
                name = node.nodeName.toLowerCase();
                if (node.nodeType !== 1) { continue; }
                if (name !== 'iframehtml') {
                    val = node.innerText || node.textContent;
                } else {
                    this._tempDiv.appendChild(node);
                    val = this._tempDiv.innerHTML.replace(/<\/*iframehtml>/gi, '');
                    this._tempDiv.innerHTML = '';
                }
                obj[name] = val;
            }

            return obj;
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
                      this.current.category.exercises[setTo];

                if (ret) {
                    this.current[what] = ret;
                }

            }

            return ret;
        }

    };

    return Exercises;

});
