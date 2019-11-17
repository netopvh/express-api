const express = require('express');

const router = express.Router();

/**
 * Swagger Router
 */
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * Middlewares
 */
const authMiddleware = require('../../app/Middlewares/AuthMiddleware');

/**
 * Open Routes
 */
router.get('/', (req, res) => res.json({ msg: 'okay' }));

const usersRoutes = router;
const sessionRoutes = router;
const UserController = require('../../app/Controllers/Http/Users/UserController');
const SessionController = require('../../app/Controllers/Http/Auth/SessionController');
const TestController = require('../../app/Controllers/Http/TestController');

usersRoutes.get('/test', TestController.index);

usersRoutes.post('/users/', UserController.store);
sessionRoutes.post('/sessions', SessionController.store);

/**
 * Global Middlewares
 */
router.use(authMiddleware);

/**
 * Private routes and own middlewares
 */

usersRoutes
  .get('/users', UserController.index)
  .put('/users/:id', UserController.update)
  .delete('/users/:id', UserController.destroy);

/**
 * Constructor of routes
 */
const routes = [usersRoutes];
router.use(...routes);

module.exports = router;
