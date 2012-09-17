(function(require, mocha, chai) {

    "use strict";

    require.config({
        // Append a cache-busting querystring because Canary's caching is very
        // aggressive even with "Disable cache" checked. Could it also be
        // python's SimpleHTTPServer?
        urlArgs: "v="+(new Date()).getTime(),

        baseUrl: '../app/assets/js/',

        paths: {
            jquery: 'vendor/jquery-1.8.1'
        }

    });

    // Use absolute paths for convenience, we'll need to prepend all spec paths
    // with ../../.. otherwise. We serve the test runner through
    // SimpleHTTPServer anyway.
    var specs = [
        '/test/spec/test-exercise.js'
    ];

    mocha.setup('bdd');
    window.should = chai.should();
    require(specs, mocha.run);

})(require, mocha, chai);
