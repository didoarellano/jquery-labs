(function(require, mocha, chai) {

    "use strict";

    // Append a cache-busting querystring because Canary's caching is very
    // aggressive even with "Disable cache" checked. Could it also be python's
    // SimpleHTTPServer?
    require.config({
        urlArgs: "v="+(new Date()).getTime()
    });

    var specs = [
        'spec/test-exercise'
    ];

    mocha.setup('bdd');
    window.should = chai.should();
    require(specs, mocha.run);

})(require, mocha, chai);
