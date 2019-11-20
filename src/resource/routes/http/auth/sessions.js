const router = require('express').Router();

const SessionController = require('../../../../app/Controllers/Http/Auth/SessionController');

router.post('/sessions', SessionController.store);

module.exports = router;
