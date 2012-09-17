define(['exercise'], function(Exercise) {
    /*global describe, beforeEach, it, expect*/

    "use strict";

    describe('Exercise constructor', function() {

        // Set up the Exercise instance //-v-
        var exercise, conf;
        conf = {
            instructions: 'This is what you should do.',
            selector: '#context',
            iframePath: 'fake/path',
            iframeName: 'next'
        };
        beforeEach(function() {
            exercise = new Exercise(conf);
        });
        //-^-

        it('should expose config properties as instance properties', function() {

            var props = ['instructions', 'selector', 'iframePath', 'iframeName'];

            expect(exercise).to.include.keys(props);

            expect(exercise.instructions).to.equal( conf.instructions );
            expect(exercise.selector).to.equal( conf.selector );
            expect(exercise.iframePath).to.equal( conf.iframePath );
            expect(exercise.iframeName).to.equal( conf.iframeName );

        });

        it('should set iframeHTML & cmd as empty string properties', function() {
            expect(exercise.iframeHTML).to.equal('');
            expect(exercise.cmd).to.equal('');
        });

        it('should create iframeSrc property', function() {
            var path = conf.iframePath + '/' + conf.iframeName + '.html';
            expect(exercise.iframeSrc).to.equal(path);
        });


        describe('Default values', function() {

            var defVal;

            beforeEach(function() {
                defVal = new Exercise({
                    iframeName: 'prev'
                });
            });

            it('should default to an iframePath property of assets/exercises', function() {
                expect(defVal.iframePath).to.equal('assets/exercises');
                expect(defVal.iframeSrc).to.equal('assets/exercises/prev.html');
            });
        });

    });

});
