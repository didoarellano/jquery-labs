define(['jquery', 'appview'], function($, AppView) {
    /*global describe, it, expect, FnFaker*/

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
                '$iframe',
                '$pre',
                '$instructions',
                '$context'
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

            var mockStyle;

            beforeEach(function() {
                appview.$iframe = $('<iframe>').appendTo('body').hide();
                mockStyle = $('<style id="sandbox-styles">')
                    .text("[s=✓] {background-color: #8ae234;} [s=x] {background-color: red;}")
                    .appendTo('head');
                appview.prepareIframe();
            });

            afterEach(function() {
                appview.$iframe.remove();
                mockStyle.remove();
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
                var src = script.getAttribute('src');

                // TODO Find a better way to test the presence of jQuery in
                // iframeWindow. This is suboptimal because:
                //   - the cloneNode way doesn't fire onload.
                //   - onload on script elements don't work in IE, use
                //     onreadystatechange instead.
                appview.iframeScript.onload = function() {
                    expect(appview.iframeWindow.jQuery).to.exist;
                };

                expect(src).to.contain('http').and.to.contain('jquery');
            });

        });


        describe("#updateViews method", function() {
            var html;
            beforeEach(function() {
                html = '<h1>This be the html</h1>';
                appview.iframeBody = {};
                appview.$pre = $('<pre>');
                appview.updateViews(html);
            });

            it("should set appview.iframeBody.innerHTML to passed html parameter", function() {
                expect(appview.iframeBody.innerHTML).to.equal(html);
            });
            it("should set appview.$pre text content to passed html parameter", function() {
                expect(appview.$pre.text()).to.equal(html);
            });
        });


        describe("#renderExercise method", function() {
            it("should call appview.updateViews, passing in the iframehtml property of an exercise object", function() {
                var updateViews = new FnFaker();
                appview.updateViews = updateViews;

                var exercise = {iframehtml: '<p>hi</p>'};
                appview.renderExercise(exercise);

                expect(updateViews.called).to.be.true;
                expect(updateViews.args[0]).to.be.equal(exercise.iframehtml);
            });
        });

    });

});
