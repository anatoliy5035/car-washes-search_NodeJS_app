const routes = require('express').Router();
const input = require('./input');
const search = require('./search');
const searchInput = require('./search-input');

routes.get('/', input);
routes.post('/searchCords', searchInput);
routes.get('/searchLoc', search);

module.exports = routes;
