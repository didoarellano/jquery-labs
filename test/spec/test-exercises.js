define(['exercises', 'exercise', 'jquery'], function(Exercises, Exercise, $) {
    /*global describe, beforeEach, it, expect*/

    "use strict";

    describe('Exercises collection', function() {

        var collection, exers;
        exers = [
            { type: 'method',
              instructionsheading: 'Instruction 1',
              selector: '#1',
              iframehtml: '<p>next</p>' },
            { type: 'method',
              instructionsheading: 'Instruction 2',
              selector: '#2',
              iframehtml: '<p>prev</p>' }
        ];

        beforeEach(function() {
            collection = new Exercises();
        });
        afterEach(function() {
            collection = null;
        });


        describe('#add method', function() {

            beforeEach(function() {
                collection.add('traversing', exers);
            });

            it('should take a category name and an array of objects as its arguments', function() {
                expect(collection).to.contain.key('traversing');
                expect(collection.traversing).to.contain.key('exercises');
                expect(collection.traversing.exercises).to.be.an('array');
            });

            it('should create an array of Exercise instances from the array param', function() {
                collection.traversing.exercises.forEach(function(el, i) {
                    expect(el).to.be.an.instanceof(Exercise);
                });
            });

            it('should default to an empty array if none is passed in', function() {
                collection.add('noarray');
                expect(collection.noarray.exercises).to.be.an('array').and.to.be.empty;
            });

        });


        describe('#_massageToObject method', function() {
            var _type = 'codemirror';
            var _instructionsheading = 'This is what you should do.';
            var _iframehtml = '<div><p>Haych-tee-em-el</p></div>';
            var _selector = '#element';
            var exercise = document.createElement('exercise');
            var type = document.createElement('type');
            var instructionsheading = document.createElement('instructionsheading');
            var iframehtml = document.createElement('iframehtml');
            var selector = document.createElement('selector');

            type.innerHTML = _type;
            instructionsheading.innerHTML = _instructionsheading;
            iframehtml.innerHTML = _iframehtml;
            selector.innerHTML = _selector;

            exercise.appendChild(type);
            exercise.appendChild(instructionsheading);
            exercise.appendChild(iframehtml);
            exercise.appendChild(selector);

            var res = (new Exercises())._massageToObject(exercise);

            it('should convert a DOM element tree to a JS object', function() {
                expect(res).to.be.an('object')
                    .and.include.keys(['type', 'instructionsheading', 'iframehtml', 'selector']);

                expect(res.type).to.be.equal(_type);
                expect(res.instructionsheading).to.be.equal(_instructionsheading);
                expect(res.iframehtml).to.be.equal(_iframehtml);
                expect(res.selector).to.be.equal(_selector);
            });

        });


        describe('#fetch method', function() {

            var deferred;
            beforeEach(function() {
                deferred = collection.fetch('filtering', 'fixtures/test-exercises-fetch.xml');
            });

            it('should return a jQuery deferred object', function(done) {
                // replace this with a chai deferred plugin when you get DSL
                // back.
                expect(deferred.done).to.be.a('function');
                done();
            });

            it('should create a category with Exercise objects instatiated from the xml config', function(done) {
                deferred.done(
                    function() {
                        var first = collection.filtering.exercises[0];
                        var second = collection.filtering.exercises[1];

                        expect(collection).to.contain.key('filtering');
                        expect(collection.filtering.exercises).to.be.an('array').and.have.length(2);

                        expect(first).to.be.an.instanceof(Exercise);
                        expect(second).to.be.an.instanceof(Exercise);

                        done();
                    }
                );
            });

        });


        describe('#setCurrent method', function() {

            beforeEach(function() {
                collection.add('traversing', exers);
                collection.add('selecting', exers);
            });

            describe('category', function() {

                it('should set current category to the object matching the string param', function() {
                    collection.setCurrent('category', 'traversing');
                    var current = collection.current.category;
                    expect(current).to.be.equal(collection.traversing);
                });

                it('should return the new current category array', function() {
                    var selecting = collection.setCurrent('category', 'selecting');
                    var current = collection.current.category;
                    expect(current).to.be.equal(selecting);
                });

                it('should return undefined if the category doesn\'t exist', function() {
                    var unknown = collection.setCurrent('category', 'unkowncategory');
                    expect(unknown).to.be.undefined;
                });

                it('should not set current category when specified category doesn\'t exist', function() {
                    collection.setCurrent('category', 'traversing');
                    collection.setCurrent('category', 'unkowncategory');
                    var current = collection.current.category;
                    expect(current).to.be.equal(collection.traversing);
                });

            });

            describe('exercise', function() {

                it('should set current exercise to the object matching the index param', function() {
                    collection.setCurrent('category', 'traversing');
                    collection.setCurrent('exercise', 1);
                    var current = collection.current.exercise;
                    expect(current).to.be.equal(collection.traversing.exercises[1]);
                });

                it('should return the new current exercise object', function() {
                    collection.setCurrent('category', 'traversing');
                    var index1 = collection.setCurrent('exercise', 1);
                    var current = collection.current.exercise;
                    expect(current).to.be.equal(index1);
                });

                it('should return undefined if the exercise doesn\'t exist', function() {
                    var unknown = collection.setCurrent('exercise', 9);
                    expect(unknown).to.be.undefined;
                });

                it('should not set current exercise when specified index doesn\'t exist', function() {
                    collection.setCurrent('category', 'traversing');
                    collection.setCurrent('exercise', 1);
                    collection.setCurrent('exercise', 9);
                    var current = collection.current.exercise;
                    expect(current).to.be.equal(collection.traversing.exercises[1]);
                });

            });

            describe('category & exercise', function() {//-v-
                var collection = new Exercises();
                collection.add('traversing', exers);
                collection.add('selecting', exers);

                it('should accept an object that sets both current category and exercise', function() {
                    var current = collection.setCurrent({
                        category: 'traversing',
                        exercise: 1
                    });

                    expect(collection.current.category).to.be.equal(collection.traversing);
                    expect(collection.current.exercise).to.be.equal(collection.traversing[1]);

                    expect(collection.current.category).to.be.equal(current.category);
                    expect(collection.current.exercise).to.be.equal(current.exercise);
                });
            });

        });

    });

});
