(function(require, mocha, chai) {

    "use strict";

    var specs = [
        'spec/test-exercise'
    ];

    mocha.setup('bdd');
    window.should = chai.should();
    require(specs, mocha.run);

})(require, mocha, chai);
