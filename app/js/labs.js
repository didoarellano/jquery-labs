define(['jquery'], function($) {

    "use strict";

    var labs = {};

    labs.init = function() {
        console.log('labs: ', this);
        console.log('jQuery: ', $);
    };

    return labs;

});
