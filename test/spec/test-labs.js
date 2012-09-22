define(['labs', 'exercises', 'appview'], function(Labs, Exercises, AppView) {
    /*global describe, it, expect*/

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

            function Faker() {
                function fn() {
                    fn.called = true;
                    fn.args = Array.prototype.slice.call(arguments);
                }
                fn.called = false;
                return fn;
            }

            describe('Case: hash.category doesn\'t exist', function() {//-v-

                it('should call AppView#gotoIndex', function() {
                    fakeEvt.data.hash = '';
                    var gotoIndex = new Faker();

                    labs.appview.gotoIndex = gotoIndex;

                    labs.onHashChange(fakeEvt);
                    expect(gotoIndex.called).to.be.true;
                });

            });//-^-

            describe('Case: hash.category is not the current category', function() {//-v-

                var fetch = new Faker();
                var gotoExercise = new Faker();

                labs.collection.fetch = fetch;
                labs.appview.gotoExercise = gotoExercise;

                labs.currentCategory = 'selecting';
                fakeEvt.data.hash = '#/traversing';
                labs.onHashChange(fakeEvt);

                it('should call Exercises#fetch', function() {
                    expect(fetch.called).to.be.true;
                    expect(fetch.args).to.have.length.above(1);
                    expect(fetch.args[0]).to.equal('traversing');
                    expect(fetch.args[1]).to.equal('assets/exercises/traversing.xml');
                    if (fetch.args[2]) {
                        expect(fetch.args[2]).to.be.a('function');
                    }
                });

                it('should call AppView#gotoExercise', function() {
                    expect(gotoExercise.called).to.be.true;
                });

            });//-^-

            describe('Case: hash.category has already been loaded', function() {//-v-

                labs.currentCategory = 'selecting';
                labs.collection.filtering = {};

                var fetch = new Faker();
                var gotoExercise = new Faker();

                labs.collection.fetch = fetch;
                labs.appview.gotoExercise = gotoExercise;

                fakeEvt.data.hash = '#/filtering';
                labs.onHashChange(fakeEvt);

                it('should not call Exercises#fetch', function() {
                    expect(fetch.called).to.be.false;
                });

                it('should call AppView#gotoExercise', function() {
                    expect(gotoExercise.called).to.be.true;
                });

            });//-^-


        });//-^-

        describe('#start method', function() {//-v-
            it('should exist', function() {
                expect(labs.start).to.be.a('function');
            });
        });//-^-

        describe('#cacheSelectors method', function() {//-v-
            it('should exist', function() {
                expect(labs.cacheSelectors).to.be.a('function');
            });
        });//-^-

        describe('#attachListeners method', function() {//-v-
            it('should exist', function() {
                expect(labs.attachListeners).to.be.a('function');
            });
        });//-^-

        describe('#parseHash method', function() {//-v-

            it('should return an object with category & exercise properties', function() {
                var hash = labs.parseHash('#/selecting/4');
                expect(hash.category).to.be.equal('selecting');
                expect(hash.exercise).to.be.equal(4);
            });

            it('exercise property should default to 0 if omitted or NaN in argument', function() {
                var noNum = labs.parseHash('#/selecting');
                expect(noNum.exercise).to.be.equal(0);
                noNum = labs.parseHash('#/selecting/x');
                expect(noNum.exercise).to.be.equal(0);
            });

        });//-^-

        describe('Keeps track of current category/exercise', function() {//-v-

            it('should have currentCategory and currentExercise properties', function() {
                expect(labs.currentCategory).to.exist.and.to.be.a('string');
                expect(labs.currentExercise).to.be.null;
            });

        });//-^-

    });

});
