define(['labs', 'exercises', 'appview', 'jquery'], function(Labs, Exercises, AppView, $) {
    /*global describe, it, expect FnFaker*/

    "use strict";

    describe('Labs controller', function() {
        var labs = new Labs();

        describe('On instantiation', function() {//-v-

            it('should instantiate an Exercises object', function() {
                expect(labs.collection).to.be.an.instanceof(Exercises);
            });

            it('should instantiate an AppView object', function() {
                expect(labs.appview).to.be.an.instanceof(AppView);
            });

        });//-^-

        describe('#onHashChange method', function() {//-v-
            var fakeEvt = {
                data: { hash: '' }
            };

            describe('Case: hash.category doesn\'t exist', function() {//-v-

                it('should call AppView#slideTo(\'index\')', function() {
                    fakeEvt.data.hash = '';
                    var slideTo = new FnFaker();

                    labs.appview.slideTo = slideTo;

                    labs.onHashChange(fakeEvt);
                    expect(slideTo.called).to.be.true;
                    expect(slideTo.args[0]).to.be.equal('index');
                });

            });//-^-

            describe('Case: hash.category is not the current category', function() {//-v-

                var fetch = new FnFaker({
                    done: function() {}
                });
                var slideTo = new FnFaker();

                labs.collection.fetch = fetch;
                labs.appview.slideTo = slideTo;

                labs.currentCategory = 'selecting';
                fakeEvt.data.hash = '#/traversing';
                labs.onHashChange(fakeEvt);

                it('should call Exercises#fetch', function() {
                    expect(fetch.called).to.be.true;
                    expect(fetch.args).to.have.length.above(1);
                    expect(fetch.args[0]).to.equal('traversing');
                    expect(fetch.args[1]).to.equal('assets/exercises/traversing.xml');
                });

                it('should call AppView#slideTo(\'exercise\')', function() {
                    expect(slideTo.called).to.be.true;
                    expect(slideTo.args[0]).to.be.equal('exercise');
                });

            });//-^-

            describe('Case: hash.category has already been loaded', function() {//-v-

                labs.currentCategory = 'selecting';
                labs.collection.filtering = {};

                var fetch = new FnFaker();
                var slideTo = new FnFaker();

                labs.collection.fetch = fetch;
                labs.appview.slideTo = slideTo;

                fakeEvt.data.hash = '#/filtering';
                labs.onHashChange(fakeEvt);

                it('should not call Exercises#fetch', function() {
                    expect(fetch.called).to.be.false;
                });

                it('should call AppView#slideTo(\'exercise\')', function() {
                    expect(slideTo.called).to.be.true;
                    expect(slideTo.args[0]).to.be.equal('exercise');
                });

            });//-^-

            describe('Case: hash.exercise exists and is a number', function() {//-v-
                fakeEvt.data.hash = '#/filtering/0';
                var startExercise = new FnFaker();

                labs.appview.startExercise = startExercise;
                labs.onHashChange(fakeEvt);

                it('should call AppView#startExercise', function() {
                    expect(startExercise.called).to.be.true;
                });

            });//-^-

            describe('Case: hash.exercise is NaN', function() {//-v-
                fakeEvt.data.hash = '#/filtering/';
                var endExercise = new FnFaker();

                labs.appview.endExercise = endExercise;
                labs.onHashChange(fakeEvt);

                it('should call AppView#endExercise', function() {
                    expect(endExercise.called).to.be.true;
                });

            });//-^-

        });//-^-

        describe('#start method', function() {//-v-
            var labs = new Labs();
            var cacheSelectors = new FnFaker();
            var attachListeners = new FnFaker();
            var setDimensions = new FnFaker();

            labs.cacheSelectors = cacheSelectors;
            labs.attachListeners = attachListeners;
            labs.appview.setDimensions = setDimensions;

            labs.start();

            it('should call #cacheSelectors', function() {
                expect(cacheSelectors.called).to.be.true;
            });

            it('should call #attachListeners', function() {
                expect(attachListeners.called).to.be.true;
            });

            it('should call AppView#setDimensions', function() {
                expect(setDimensions.called).to.be.true;
            });

        });//-^-

        describe('#cacheSelectors method', function() {//-v-
            var labs = new Labs();
            labs.cacheSelectors();
            it('should cache selectors', function() {
                expect(labs.$window).to.exist;
            });
        });//-^-

        describe('#attachListeners method', function() {//-v-
            var labs = new Labs();
            var $window = $(window);
            var $exercise = $(document.createElement('div'));

            labs.$window = $window;
            labs.appview.$exercise = $exercise;
            labs.attachListeners();

            it('should bind a hashchange event listener to the window', function() {
                var events = $._data(window, 'events');
                expect(events.hashchange).to.exist;
            });

            it('should bind a resize event listener to the window', function() {
                var events = $._data(window, 'events');
                expect(events.resize).to.exist;
            });

            it('should delegate clicks on a.button elements to appview.$exercise', function() {
                var events = $._data(labs.appview.$exercise[0], 'events');
                var click = events.click;
                expect(click.delegateCount).to.be.greaterThan(0);
                expect(click[0].selector).to.be.equal('a.button');
            });
        });//-^-

        describe('#parseHash method', function() {//-v-

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

        });//-^-

        describe('Keeps track of current category/exercise', function() {//-v-

            it('should have currentCategory and currentExercise properties', function() {
                var labs = new Labs();
                expect(labs.currentCategory).to.be.null;
                expect(labs.currentExercise).to.be.null;
            });

        });//-^-

    });

});
