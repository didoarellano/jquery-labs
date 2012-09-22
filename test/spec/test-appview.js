define(['appview'], function(AppView) {
    /*global describe, it, expect*/

    "use strict";

    // Learn how to test DOM-tied shit and come back to this.

    describe('Main App View', function() {
        var appview = new AppView();

        it('should cache selectors on instantiation', function() {
            expect(appview.body).to.exist;
            expect(appview.$container).to.exist;
            expect(appview.$index).to.exist;
            expect(appview.$exercise).to.exist;
        });

        describe('#gotoExercise method', function() {
            it('should exist', function() {
                expect(appview.gotoExercise).to.be.a('function');
            });
        });

        describe('#gotoIndex method', function() {
            it('should exist', function() {
                expect(appview.gotoIndex).to.be.a('function');
            });
        });

        describe('#resizeViewPort method', function() {
            it('should exist', function() {
                expect(appview.resizeViewPort).to.be.a('function');
            });
        });

    });

});