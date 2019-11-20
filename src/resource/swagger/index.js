const swaggerUi = require('swagger-ui-express');
const config = require('../../config/swagger');
const tags = require('./tags');

/**
 * Paths with models and http methods
 */
const sessions = require('./paths/sessions');
const users = require('./paths/users');

/**
 * Models
 */
const models = {
  ...sessions.model,
  ...users.model,
};

/**
 * Paths - Object Swagger
 */
const paths = {
  '/sessions': { post: sessions.store },
  '/users': { get: users.index },
};

module.exports = [
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup({ ...config, paths, tags, definitions: models }),
];
