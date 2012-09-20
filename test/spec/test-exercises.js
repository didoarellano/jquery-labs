define(['exercises', 'exercise'], function(Exercises, Exercise) {
    /*global describe, beforeEach, it, expect*/

    "use strict";

    var exers = [
        { instructions: 'Instruction 1',
        selector: '#1',
        iframehtml: '<p>next</p>' },
        { instructions: 'Instruction 2',
        selector: '#2',
        iframehtml: '<p>prev</p>' }
    ];

    describe('Exercises collection', function() {

        describe('#add method', function() {//-v-

            var exercises = new Exercises();
            exercises.add('traversing', exers);

            it('should take a category name and an array of objects as its arguments', function() {
                expect(exercises).to.contain.key('traversing');
                expect(exercises.traversing).to.be.an('array');
            });

            it('should create an array of Exercise instances from the array param', function() {
                exercises.traversing.forEach(function(el, i) {
                    expect(el).to.be.an.instanceof(Exercise);
                });
            });

            it('should default to an empty array if none is passed in', function() {
                exercises.add('noarray');
                expect(exercises.noarray).to.be.an('array').and.to.be.empty;
            });

        });//-^-

        describe('#_massageToObject method', function() {//-v-
            var _instructions = 'This is what you should do.';
            var _iframehtml = '<div><p>Haych-tee-em-el</p></div>';
            var _selector = '#element';
            var exercise = document.createElement('exercise');
            var instructions = document.createElement('instructions');
            var iframehtml = document.createElement('iframehtml');
            var selector = document.createElement('selector');

            instructions.innerHTML = _instructions;
            iframehtml.innerHTML = _iframehtml;
            selector.innerHTML = _selector;

            exercise.appendChild(instructions);
            exercise.appendChild(iframehtml);
            exercise.appendChild(selector);

            var res = (new Exercises())._massageToObject(exercise);

            it('should convert a DOM element tree to a JS object', function() {
                expect(res).to.be.an('object')
                    .and.include.keys(['instructions', 'iframehtml', 'selector']);

                expect(res.instructions).to.be.equal(_instructions);
                expect(res.iframehtml).to.be.equal(_iframehtml);
                expect(res.selector).to.be.equal(_selector);
            });

        });//-^-

        describe('#fetch method', function() {//-v-

            var exercises;

            beforeEach(function() {
                exercises = new Exercises();
            });

            it('should create a category with Exercise objects instatiated from the xml config', function(done) {
                exercises.fetch('filtering', 'fixtures/test-exercises-fetch.xml', function() {
                    var first = exercises.filtering[0];
                    var second = exercises.filtering[1];

                    expect(exercises).to.contain.key('filtering');
                    expect(exercises.filtering).to.be.an('array').and.have.length(2);

                    expect(first).to.be.an.instanceof(Exercise);
                    expect(second).to.be.an.instanceof(Exercise);

                    done();
                });
            });

        });//-^-

        describe('#setCurrent method', function() {//-v-

            var exercises = new Exercises();
            exercises.add('traversing', exers);
            exercises.add('selecting', exers);

            describe('category', function() {//-v-

                it('should set current category to the object matching the string param', function() {
                    exercises.setCurrent('category', 'traversing');
                    var current = exercises.current.category;
                    expect(current).to.be.equal(exercises.traversing);
                });

                it('should return the new current category array', function() {
                    var selecting = exercises.setCurrent('category', 'selecting');
                    var current = exercises.current.category;
                    expect(current).to.be.equal(selecting);
                });

                it('should return undefined if the category doesn\'t exist', function() {
                    var unknown = exercises.setCurrent('category', 'unkowncategory');
                    expect(unknown).to.be.undefined;
                });

                it('should not set current category when specified category doesn\'t exist', function() {
                    exercises.setCurrent('category', 'traversing');
                    exercises.setCurrent('category', 'unkowncategory');
                    var current = exercises.current.category;
                    expect(current).to.be.equal(exercises.traversing);
                });

            });//-^-

            describe('exercise', function() {//-v-

                it('should set current exercise to the object matching the index param', function() {
                    exercises.setCurrent('exercise', 1);
                    var current = exercises.current.exercise;
                    expect(current).to.be.equal(exercises.traversing[1]);
                });

                it('should return the new current exercise object', function() {
                    exercises.setCurrent('category', 'traversing');
                    var index1 = exercises.setCurrent('exercise', 1);
                    var current = exercises.current.exercise;
                    expect(current).to.be.equal(index1);
                });

                it('should return undefined if the exercise doesn\'t exist', function() {
                    var unknown = exercises.setCurrent('exercise', 9);
                    expect(unknown).to.be.undefined;
                });

                it('should not set current exercise when specified index doesn\'t exist', function() {
                    exercises.setCurrent('category', 'traversing');
                    exercises.setCurrent('exercise', 1);
                    exercises.setCurrent('exercise', 9);
                    var current = exercises.current.exercise;
                    expect(current).to.be.equal(exercises.traversing[1]);
                });

            });//-^-

            describe('category & exercise', function() {//-v-
                var exercises = new Exercises();
                exercises.add('traversing', exers);
                exercises.add('selecting', exers);

                it('should accept an object that sets both current category and exercise', function() {
                    var current = exercises.setCurrent({
                        category: 'traversing',
                        exercise: 1
                    });

                    expect(exercises.current.category).to.be.equal(exercises.traversing);
                    expect(exercises.current.exercise).to.be.equal(exercises.traversing[1]);

                    expect(exercises.current.category).to.be.equal(current.category);
                    expect(exercises.current.exercise).to.be.equal(current.exercise);
                });
            });//-^-

        });//-^-

    });

});
