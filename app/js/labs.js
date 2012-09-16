define(['jquery'], function($) {

    "use strict";

    var body = document.body;
    var $win = $(window);
    var labs = {};

    labs.init = function() {
        if (body.className === 'index') {
            appendSavePoints();
        }

        loadExercises();
        $win.on('hashchange', loadExercises);
    };

    return labs;

    function appendSavePoints() {
        // TODO: Get savePoints from localStorage once we're saving data
        $('.categories a').each(function(i, el) {
            el.href = el.href + '/1';
        });
    }

    function loadExercises() {
        // #/selecting/1
        var hash = window.location.hash.split('/');
        var category = hash[1];
        var savePoint = parseInt(hash[2], 10);

        if (!category) { return; }

        console.log(category, savePoint);

    }

});
