define(['jquery', 'appview'], function($, AppView) {
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
            expect(appview.$iframe).to.exist;
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

        describe('#prepareIframe method', function() {

            var appview, mockStyle;

            beforeEach(function() {
                appview = new AppView();
                appview.$iframe = $('<iframe>').appendTo('body').hide();
                mockStyle = $('<style id="sandbox-styles">')
                    .text("[s=✓] {background-color: #8ae234;} [s=x] {background-color: red;}")
                    .appendTo('head');
                appview.prepareIframe();
            });

            afterEach(function() {
                appview.$iframe.remove();
                mockStyle.remove();
                appview = null;
            });

            it('should cache the iframe\'s window', function() {
                expect(appview.iframeWindow).to.exist;
            });

            it('should cache the iframe\'s body object', function() {
                expect(appview.iframeBody).to.exist;
            });

            it('should inject a style tag in head containing {xxx}', function() {
                var style = appview.iframeWindow.document.getElementsByTagName('style')[0];
                expect(style.id).to.be.equal('sandbox-styles');
            });

            it('should inject a script tag in head pointing to jquery', function() {
                var script = appview.iframeWindow.document.getElementsByTagName('script')[0];
                expect(script.src).to.contain('jquery');
            });

        });

    });

});
