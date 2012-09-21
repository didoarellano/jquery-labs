define(['labs'], function(Labs) {
    /*global describe, it, expect*/

    "use strict";

    describe('Labs controller', function() {
        var labs = new Labs();

        describe('#parseHash method', function() {//-v-

            it('should return an object with category & exercise properties', function() {
                var hash = labs.parseHash('#/selecting/4');
                expect(hash.category).to.be.equal('selecting');
                expect(hash.exercise).to.be.equal(4);
            });

            it('exercise property should default to 0 if omitted in argument', function() {
                var noNum = labs.parseHash('#/selecting');
                expect(noNum.exercise).to.be.equal(0);
            });

        });//-^-

    });

});