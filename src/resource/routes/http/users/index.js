const router = require('express').Router();

const UserController = require('../../../../app/Controllers/Http/Users/UserController');
const AuthMiddleware = require('../../../../app/Middlewares/AuthMiddleware');

router
  .get('/users', AuthMiddleware, UserController.index)
  .post('/users/', AuthMiddleware, UserController.store)
  .put('/users/:id', AuthMiddleware, UserController.update)
  .delete('/users/:id', AuthMiddleware, UserController.destroy);

module.exports = router;
