define(['jquery', 'appview'], function($, AppView) {
    /*global describe, it, expect*/

    "use strict";

    describe('Main App View', function() {
        var appview;
        beforeEach(function() {
            appview = new AppView();
        });
        afterEach(function() {
            appview = null;
        });

        it('should cache selectors on instantiation', function() {
            var props = [
                '$window',
                'body',
                '$container',
                '$index',
                '$exercise',
                '$views',
                '$startScreens',
                '$sidebar',
                '$iframe'
            ];
            var i = props.length;

            while (i--) {
                expect(appview[props[i]]).to.exist;
            }
        });


        describe('#slideTo method', function() {
            it('should set a className property on appview.body equal to "on" + param', function() {
                appview.body = {};
                appview.slideTo('exercise');
                expect(appview.body.className).to.equal('onexercise');
            });
        });


        describe('#prepareStartScreen method', function() {
            it('should exist', function() {
                expect(appview.prepareStartScreen).to.be.a('function');
            });
        });


        describe('#startExercise method', function() {
            it('should add a "started" class to appview.$exercise', function() {
                appview.$exercise = $('<div>');
                appview.startExercise();
                expect(appview.$exercise[0].className).to.equal('started');
            });
            it('should add a "show" class to appview.$sidebar', function() {
                appview.$sidebar = $('<aside>');
                appview.startExercise();
                expect(appview.$sidebar[0].className).to.equal('show');
            });
        });


        describe('#endExercise method', function() {
            it('should remove the "started" class from appview.$exercise', function() {
                appview.$exercise = $('<div class="started">');
                appview.endExercise();
                expect(appview.$exercise[0].className).to.equal('');
            });
            it('should remove the "show" class from appview.$sidebar', function() {
                appview.$sidebar = $('<aside class="show">');
                appview.endExercise();
                expect(appview.$sidebar[0].className).to.equal('');
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
