define(['labs', 'exercises', 'appview', 'jquery'], function(Labs, Exercises, AppView, $) {
    /*global describe, it, expect, FnFaker, beforeEach*/

    "use strict";

    describe('Labs controller', function() {
        var labs;
        beforeEach(function() {
            labs = new Labs();
        });
        afterEach(function() {
            labs = null;
        });


        describe('On instantiation', function() {

            it('should instantiate an Exercises object', function() {
                expect(labs.collection).to.be.an.instanceof(Exercises);
            });

            it('should create properties with null values', function() {
                expect(labs.appview).to.be.null;
                expect(labs.currentCategory).to.be.null;
                expect(labs.currentExercise).to.be.null;
            });

        });


        describe('#start method', function() {

            it('should instantiate an AppView object', function() {
                labs.start();
                expect(labs.appview).to.be.an.instanceof(AppView);
            });

            it('should call #attachListeners', function() {
                var attachListeners = new FnFaker();
                labs.attachListeners = attachListeners;
                labs.start();

                expect(attachListeners.called).to.be.true;
            });

        });


        describe('#parseHash method', function() {

            it('should return an object with category & exercise properties', function() {
                var hash = labs.parseHash('#/selecting/4');
                expect(hash.category).to.be.equal('selecting');
                expect(hash.exercise).to.be.equal(4);
            });

            it('exercise property should be NaN if argument is not a number or missing', function() {
                var noNum = labs.parseHash('#/selecting');
                expect(isNaN(noNum.exercise)).to.be.true;
                noNum = labs.parseHash('#/selecting/x');
                expect(isNaN(noNum.exercise)).to.be.true;
            });

        });


        describe('#attachListeners method', function() {

            var windowEvents;
            beforeEach(function() {
                var $fakeWindow = $(document.createElement('div'));
                var $fakeExercise = $(document.createElement('span'));

                labs.appview = new AppView();
                labs.appview.$window = $fakeWindow;
                labs.appview.$exercise = $fakeExercise;

                labs.attachListeners();

                windowEvents = $._data($fakeWindow[0], 'events');
            });

            it('should bind a hashchange event listener to the window', function() {
                expect(windowEvents.hashchange).to.exist;
            });

            it('should bind a resize event listener to the window', function() {
                expect(windowEvents.resize).to.exist;
            });

            it('should delegate clicks on a.button elements to appview.$exercise', function() {
                var events = $._data(labs.appview.$exercise[0], 'events');
                var click = events.click;
                expect(click.delegateCount).to.be.greaterThan(0);
                expect(click[0].selector).to.be.equal('a.button');
            });

        });


        describe('#onHashChange method', function() {

            var fakeEvt;
            beforeEach(function() {
                labs.appview = new AppView();
                fakeEvt = {
                    data: { hash: '' }
                };
            });

            describe('Case: hash.category doesn\'t exist', function() {

                it('should call AppView#slideTo(\'index\')', function() {
                    fakeEvt.data.hash = '';
                    var slideTo = new FnFaker();

                    labs.appview.slideTo = slideTo;

                    labs.onHashChange(fakeEvt);
                    expect(slideTo.called).to.be.true;
                    expect(slideTo.args[0]).to.be.equal('index');
                });

            });

            describe('Case: hash.category hasn\'t been fetched', function() {

                it('should call Exercises#fetch', function() {
                    var fetch = new FnFaker({
                        done: function() {}
                    });
                    labs.collection.fetch = fetch;

                    labs.collection.traversing = null;
                    fakeEvt.data.hash = '#/traversing';

                    labs.onHashChange(fakeEvt);

                    expect(fetch.called).to.be.true;
                    expect(fetch.args).to.have.length.above(1);
                    expect(fetch.args[0]).to.equal('traversing');
                    expect(fetch.args[1]).to.equal('assets/exercises/traversing.xml');
                });

            });

            describe('Case: hash.category has already been loaded', function() {

                it('should not call Exercises#fetch', function() {
                    var fetch = new FnFaker({
                        done: function() {}
                    });
                    labs.collection.fetch = fetch;

                    labs.collection.filtering = ['truthy'];
                    fakeEvt.data.hash = '#/filtering';

                    labs.onHashChange(fakeEvt);

                    expect(fetch.called).to.be.false;
                });

            });

            describe('Set currentCategory & currentExercise properties', function() {

                it('should set properties', function(done) {
                    var fetch = new FnFaker({
                        done: function(cb) {
                            cb();
                            expect(labs.currentCategory).to.equal('traversing');
                            expect(labs.currentExercise).to.equal(0);
                            done();
                        }
                    });
                    labs.collection.fetch = fetch;

                    labs.collection.traversing = null;
                    fakeEvt.data.hash = '#/traversing';

                    labs.onHashChange(fakeEvt);
                });

            });

            describe('Transition to Start Screen', function() {

                it('should call AppView#prepareStartScreen()', function() {
                    var prepareStartScreen = new FnFaker();
                    labs.appview.prepareStartScreen = prepareStartScreen;

                    labs.collection.selecting = ['skip the fetch'];

                    fakeEvt.data.hash = '#/selecting';
                    labs.onHashChange(fakeEvt);

                    expect(prepareStartScreen.called).to.be.true;
                    expect(prepareStartScreen.args[0]).to.contain.keys(['category', 'exercise']);
                });

                it('should call AppView#slideTo(\'exercise\')', function() {
                    var slideTo = new FnFaker();
                    labs.appview.slideTo = slideTo;

                    labs.collection.selecting = ['skip the fetch'];

                    fakeEvt.data.hash = '#/selecting';
                    labs.onHashChange(fakeEvt);

                    expect(slideTo.called).to.be.true;
                    expect(slideTo.args[0]).to.be.equal('exercise');
                });

            });

            describe('Case: hash.exercise exists and is a number', function() {

                it('should call only AppView#startExercise', function() {
                    var startExercise = new FnFaker();
                    var endExercise = new FnFaker();

                    labs.appview.startExercise = startExercise;
                    labs.appview.endExercise = endExercise;

                    fakeEvt.data.hash = '#/filtering/0';
                    labs.onHashChange(fakeEvt);

                    expect(startExercise.called).to.be.true;
                    expect(endExercise.called).to.be.false;
                });

            });

            describe('Case: hash.exercise is NaN', function() {

                it('should call only AppView#endExercise', function() {
                    var startExercise = new FnFaker();
                    var endExercise = new FnFaker();

                    labs.appview.startExercise = startExercise;
                    labs.appview.endExercise = endExercise;

                    fakeEvt.data.hash = '#/filtering/';
                    labs.onHashChange(fakeEvt);

                    expect(endExercise.called).to.be.true;
                    expect(startExercise.called).to.be.false;
                });

            });

        });


    });

});
