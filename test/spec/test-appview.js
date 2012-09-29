define(['appview'], function(AppView) {
    /*global describe, it, expect*/

    "use strict";

    // Learn how to test DOM-tied shit and come back to this.

    describe('Main App View', function() {
        var appview = new AppView();

        it('should cache selectors on instantiation', function() {
            expect(appview.$window).to.exist;
            expect(appview.body).to.exist;
            expect(appview.$container).to.exist;
            expect(appview.$index).to.exist;
            expect(appview.$exercise).to.exist;
            expect(appview.$views).to.exist;
            expect(appview.$startScreens).to.exist;
            expect(appview.$sidebar).to.exist;
        });

        describe('#slideTo method', function() {
            it('should exist', function() {
                expect(appview.slideTo).to.be.a('function');
            });
        });

        describe('#prepareStartScreen method', function() {
            it('should exist', function() {
                expect(appview.prepareStartScreen).to.be.a('function');
            });
        });

        describe('#startExercise method', function() {
            it('should exist', function() {
                expect(appview.startExercise).to.be.a('function');
            });
        });

        describe('#endExercise method', function() {
            it('should exist', function() {
                expect(appview.endExercise).to.be.a('function');
            });
        });

        describe('#setDimensions method', function() {
            it('should exist', function() {
                expect(appview.setDimensions).to.be.a('function');
            });
        });

    });

});
