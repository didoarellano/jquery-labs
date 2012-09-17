define(['/app/js/exercise.js'], function(Exercise) {

    describe('Exercise constructor', function() {

        // Set up the Exercise instance //-v-
        var exercise, exerciseConfig;
        exerciseConfig = {
            iframeSrc: 'next.html'
        };
        beforeEach(function() {
            exercise = new Exercise(exerciseConfig);
        });
        //-^-

        it('should allow an iframeSrc property to be set', function() {
            exercise.iframeSrc.should.equal('next.html');
        });

    });

});
