var fs = require('fs');
var Q = require('q');

module.exports = function(file) {
    return Q.nfcall(fs.readFile, file).then(JSON.parse);
};
