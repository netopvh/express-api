const router = require('express').Router();
const BruteRedis = require('express-brute-redis');
const Brute = require('express-brute');
router.get('/', (req, res) => res.json({ msg: 'okay' }));

/**
 * /users
 */
router.use(require('./http/users'));

/**
 * /sessions
 */
router.use(require('./http/auth/sessions'));

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

const TestController = require('../../app/Controllers/Http/TestController');

router.get('/test', bruteForce.prevent, TestController.index);

module.exports = router;
