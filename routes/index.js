const routes = require('express').Router();
const input = require('./input');
const searchPage = require('./search-page');

routes.get('/', input);
routes.get('/search', searchPage);

module.exports = routes;
