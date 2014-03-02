var fs = require('fs');
var Q = require('q');

module.exports = function(file, header, footer, json) {
    header = header || '';
    footer = footer || '';
    var contents = header + JSON.stringify(json, null, 2) + footer;
    return Q.nfcall(fs.writeFile, file, contents);
};
