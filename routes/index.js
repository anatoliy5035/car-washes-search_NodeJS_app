const routes = require('express').Router();
const input = require('./input');
const search = require('./search');
const searchPage = require('./search-page');

routes.get('/', input);
routes.get('/search', searchPage);
routes.post('/searchCords', search);
// routes.post('/searchMyLocation', searchMyLocation);

module.exports = routes;
