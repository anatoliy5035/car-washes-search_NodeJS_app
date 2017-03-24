var nconf = require('nconf');
var path = require('path').join;
nconf.argv()
    .env()
    .file({ file: path(__dirname, 'config.json') });
module.exports = nconf;
