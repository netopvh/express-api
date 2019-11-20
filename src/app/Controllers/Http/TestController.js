const Queue = require('../../../lib/Queue');

class TestController {
  async index(req, res) {






    // Queue.add('TestJob', { msg: 'msg queue' });
    return res.status(200).json({ msg: 'Working' });
  }
}

module.exports = new TestController();
