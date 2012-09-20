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
            this[category] = instances;
        },

        fetch: function(category, configPath, cb) {

            var tempDiv;

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
                tempDiv = document.createElement('div');

                while (i--) {
                    configs.push(massageToObject(exercises[i]));
                }

                this.add(category, configs);
                cb();
            }

            function massageToObject(el) {
                var obj = {};
                var nodes = el.childNodes;
                var i = nodes.length;
                var node, val, name;

                while (i--) {
                    node = nodes[i];
                    name = node.nodeName.toLowerCase();
                    if (node.nodeType !== 1) { continue; }
                    if (name !== 'iframehtml') {
                        val = node.innerText || node.textContent;
                    } else {
                        tempDiv.appendChild(node);
                        val = tempDiv.innerHTML.replace(/<\/*iframehtml>/gi, '');
                        tempDiv.innerHTML = '';
                    }
                    obj[name] = val;
                }

                return obj;
            }

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
