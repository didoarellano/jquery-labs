var _ = require('lodash');

module.exports = function(varName, key) {
    return _.template(
        'var ${global} = ${global} || {};\n${global}["${key}"] = ',
        { global: varName, key: key }
    );
};
