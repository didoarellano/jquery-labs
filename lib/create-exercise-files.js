var fs = require('fs');
var path = require('path');
var Q = require('q');
var _ = require('lodash');
var camelize = require('to-camel-case');
var globalHeader = require('./global-object-var-header');
var createJSFileFromJSON = require('./create-js-file-from-json');
var getMarkdown = require('../lib/get-markdown');

function getCommands(dir) {
    return Q.nfcall(fs.readdir, dir).then(
        _.partial(createCommandsObject, dir),
        function() { return {}; }
    );
}

function createCommandsObject(dir, contents) {
    var commands = contents.map(function(filename) {
        var file = path.join(dir, filename);

        function createObject(code) {
            return {
                key: camelize(path.basename(filename, '.js')),
                value: code.trim().replace(/('|"){{user-command}}('|");?/g, '')
            };
        }

        return Q.nfcall(fs.readFile, file, 'utf-8').then(createObject);
    });

    return Q.all(commands).then(reduceToObject);
}

function reduceToObject(arr) {
    return arr.reduce(function(obj, current) {
        obj[current.key] = current.value;
        return obj;
    }, {});
}

function createExerciseObject(dir, category, id, commonCommands) {
    var fileContents = [
        getMarkdown(path.join(dir, 'instructions.md')),
        Q.nfcall(fs.readFile, path.join(dir, 'html-start.html'), 'utf-8'),
        getCommands(path.join(dir, 'commands'))
    ];

    function createObject(markdown, htmlStart, commands) {
        return {
            id: id,
            category: category,
            instructions: markdown.html,
            htmlStart: htmlStart,
            commands: _.merge({}, commonCommands, commands),
            userData: {
                answer: null,
                html: null,
                timestamp: 0
            }
        }
    }

    return Q.all(fileContents).spread(createObject);
}

function createExerciseObjects(config, category, exercises, commonCommands) {
    var exerciseObjects = exercises.map(function(exercise, i) {
        return createExerciseObject(
            path.join(config.srcDir, category, exercise),
            category,
            ++i,
            commonCommands
        );
    });

    return Q.all(exerciseObjects);
}

module.exports = function(config) {
    function createFile(category) {
        var key = 'exercises-' + category;
        var file = path.join(config.outputDir, key + '.js')
        var header = globalHeader(config.globalVarName, key);
        var footer = ';\n';
        var writeFile = _.partial(createJSFileFromJSON, file, header, footer);
        var commonCommands = getCommands(path.join(config.srcDir, category, 'commands-common'));
        var createObjects = _.partial(
            createExerciseObjects,
            config,
            category,
            config[category].exerciseOrder
        );

        return commonCommands.then(createObjects).then(function(exercises) {
            return writeFile({ exercises: exercises });
        });
    }

    return Q.all(config.categoryOrder.map(createFile));
}
