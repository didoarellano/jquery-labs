var path = require('path');
var Q = require('q');
var _ = require('lodash');
var globalHeader = require('./global-object-var-header');
var createJSFileFromJSON = require('./create-js-file-from-json');
var getMarkdown = require('./get-markdown');

function createCategoryObject(dir, category) {
    var description = path.join(dir, category, 'description.md');

    function createObject(contents) {
        return {
            id: category,
            title: contents.title,
            description: contents.html
        };
    }

    return getMarkdown(description).then(createObject);
}

module.exports = function(config) {
    var createObj = _.partial(createCategoryObject, config.srcDir);
    var file = path.join(config.outputDir, 'categories.js');
    var header = globalHeader(config.globalVarName, 'categories');
    var footer = ';\n';
    var writeFile = _.partial(createJSFileFromJSON, file, header, footer);
    return Q.all(config.categoryOrder.map(createObj)).then(writeFile);
}
