define(['exercise'], function(Exercise) {
    /*global describe, beforeEach, it, expect*/

    "use strict";

    describe('Exercise constructor', function() {

        // Set up the Exercise instance //-v-
        var exercise, conf;
        conf = {
            instructions: 'This is what you should do.',
            selector: '#context',
            iframehtml: '<h1>Insert me into the iframe.</h1>'
        };
        beforeEach(function() {
            exercise = new Exercise(conf);
        });
        //-^-

        it('should expose config properties as instance properties', function() {

            var props = ['instructions', 'selector', 'iframehtml'];

            expect(exercise).to.include.keys(props);

            expect(exercise.instructions).to.equal( conf.instructions );
            expect(exercise.selector).to.equal( conf.selector );
            expect(exercise.iframehtml).to.equal( conf.iframehtml );

        });

        it('should throw an error if config object is missing required properties', function() {
            var msg = /config object needs a\(n\) (instructions|iframehtml) property/;

            expect(missingInstructions).to.throw(msg);
            expect(missingIframeHTML).to.throw(msg);
            expect(missingBoth).to.throw(msg);

            function missingInstructions() {
                new Exercise({iframehtml: ''});
            }
            function missingIframeHTML() {
                new Exercise({instructions: ''});
            }
            function missingBoth() {
                new Exercise({});
            }
        });

        it('should set a command property to an empty string', function() {
            expect(exercise.command).to.equal('');
        });

        it('the optional selector property should default to null', function() {
            var noSelector = new Exercise({
                instructions: 'd',
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
                    instructions: 'd',
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
