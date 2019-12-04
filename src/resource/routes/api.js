const router = require('express').Router();

router.get('/', (req, res) => res.json({ msg: 'okay' }));

/**
 * /users
 */
router.use(require('./http/users'));

/**
 * /sessions
 */
router.use(require('./http/auth/sessions'));


const TestController = require('../../app/Controllers/Http/TestController');
router.get('/test', TestController.index);

module.exports = router;
