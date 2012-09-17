define(['/app/assets/js/exercise.js'], function(Exercise) {

    describe('Exercise constructor', function() {

        // Set up the Exercise instance //-v-
        var exercise, exerciseConfig;
        exerciseConfig = {
            instructions: 'This is what you should do.',
            selector: '#context',
            iframePath: 'fake/path',
            iframeName: 'next'
        };
        beforeEach(function() {
            exercise = new Exercise(exerciseConfig);
        });
        //-^-

        it('should expose config properties as instance properties', function() {

            exercise.should.have.property('instructions')
                .and.equal('This is what you should do.');

            exercise.should.have.property('selector')
                .and.equal('#context');

            exercise.should.have.property('iframePath')
                .and.equal('fake/path');

            exercise.should.have.property('iframeName')
                .and.equal('next');

        });

        it('should set iframeHTML & cmd as empty string properties', function() {
            exercise.iframeHTML.should.equal('');
            exercise.cmd.should.equal('');
        });

        it('should create iframeSrc property', function() {
            exercise.iframeSrc.should.equal('fake/path/next.html');
        });


        describe('Default values', function() {

            var defVal;

            beforeEach(function() {
                defVal = new Exercise({
                    iframeName: 'prev'
                })
            });

            it('should default to an iframePath property of assets/exercises', function() {
                defVal.iframePath.should.equal('assets/exercises');
                defVal.iframeSrc.should.equal('assets/exercises/prev.html');
            });
        });

    });

});
