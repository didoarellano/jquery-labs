define(['jquery', 'exercise'], function($, Exercise) {

    "use strict";

    function Labs() {}

    Labs.prototype = {

        parseHash: function(hash) {
            hash = hash.split('/');
            return {
                category: hash[1],
                exercise: hash[2] || '0',
            };
        }

    };

    return Labs;

});
