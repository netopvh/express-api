const Queue = require('../../../lib/Queue');

class TestController {
  index(req, res) {
    Queue.add('TestJob', { msg: 'Parametro que enviei pra fila' });

    return res.status(200).json({ msg: 'Working' });
  }
}

module.exports = new TestController();
