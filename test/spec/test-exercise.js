define(['exercise'], function(Exercise) {
    /*global describe, beforeEach, it, expect*/

    "use strict";
    describe('Exercise constructor', function() {

        var exercise, conf;
        // Mock configuration for the constructor
        conf = {
            type: 'method',
            instructionsheading: 'This is what you should do.',
            selector: '#context',
            iframehtml: '<h1>Insert me into the iframe.</h1>'
        };

        beforeEach(function() {
            exercise = new Exercise(conf);
        });

        afterEach(function() {
            exercise = null;
        });


        it('should expose config properties as instance properties', function() {

            var props = ['type', 'instructionsheading', 'selector', 'iframehtml'];

            expect(exercise).to.include.keys(props);

            expect(exercise.instructionsheading).to.equal( conf.instructionsheading );
            expect(exercise.selector).to.equal( conf.selector );
            expect(exercise.iframehtml).to.equal( conf.iframehtml );

        });

        it('should throw an error if config object is missing required properties', function() {
            var msg = /config object needs a\(n\) (type|instructionsheading|iframehtml) property/;

            expect(missingType).to.throw(msg);
            expect(missingInstructions).to.throw(msg);
            expect(missingIframeHTML).to.throw(msg);
            expect(missingAll).to.throw(msg);

            function missingType() {
                new Exercise({instructionsheading: '', iframehtml: ''});
            }
            function missingInstructions() {
                new Exercise({type: '', iframehtml: ''});
            }
            function missingIframeHTML() {
                new Exercise({type: '', instructionsheading: ''});
            }
            function missingAll() {
                new Exercise({});
            }
        });

        it('should set a command property to an empty string', function() {
            expect(exercise.command).to.equal('');
        });

        it('the optional selector property should default to null', function() {
            var noSelector = new Exercise({
                type: 'selecting',
                instructionsheading: 'd',
                iframehtml: 'a'
            });
            expect(noSelector.selector).to.be.null;
        });


        describe('#buildCommand method', function() {

            var command;

            beforeEach(function() {
                command = exercise.buildCommand('.prev()');
            });

            it('should return string concatenated from input & the selector property', function() {
                expect(command).to.be.equal('$("#context").prev()');
            });

            it('should return just the input when selector is null', function() {
                var noSelector = new Exercise({
                    type: 'codemirror',
                    instructionsheading: 'd',
                    iframehtml: 'a'
                });
                noSelector.buildCommand('$("p.eanut")');
                expect(noSelector.command).to.be.equal('$("p.eanut")');
            });

            it('should update the exercise\'s command property', function() {
                expect(exercise.command).to.be.equal('$("#context").prev()');
            });

        });

    });

});
