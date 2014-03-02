var fs = require('fs');
var Q = require('q');
var marked = require('marked');
var yamlfm = require('yaml-front-matter');

module.exports = function(file) {
    return Q.nfcall(fs.readFile, file)
        .then(yamlfm.loadFront)
        .then(function(contents) {
            contents.html = marked(contents.__content)
            return contents;
        });
};
