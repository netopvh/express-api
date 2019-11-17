const appJobs = require('../../app/Jobs');
const BullQueue = require('./BullQueue');

class Queue {
  constructor(jobs) {
    this.jobs = jobs.map(job => new BullQueue(job));
  }

  add(key, data) {
    const queue = this.jobs.find(item => item.job.key === key);
    return queue.bull.add(data, queue.job.options);
  }

  process() {
    this.jobs.forEach(queue => {
      const events = queue.getEvents();
      events.forEach(({ name, event }) =>
        queue.bull.on(name, queue.job[event])
      );

      queue.bull.process(queue.job.handle);
    });
  }
}

module.exports = new Queue(appJobs);
