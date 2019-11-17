const Bull = require('bull');

const redisConfig = require('../../config/redis');
const BullException = require('./Exceptions/BullException');

class BullQueue {
  constructor(job) {
    this.job = job;
    this.bull = new Bull(this.job.key, redisConfig);
  }

  getEvents() {
    // Get Job Object
    const object = Reflect.getPrototypeOf(this.job);

    // Get All methods of Job Object and filter by nameEvent
    const objectKeys = Reflect.ownKeys(object).filter(
      key => key.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')[1] === 'Event'
    );

    // Get name of event of bull and the name function
    const events = objectKeys.map(key => ({
      name: key.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')[0],
      event: key,
    }));

    // Verify if user event exists in bull to work correctly
    try {
      const eventsBull = [
        'errorEvent',
        'waitingEvent',
        'activeEvent',
        'stalledEvent',
        'progressEvent',
        'completedEvent',
        'failedEvent',
        'pausedEvent',
        'resumedEvent',
        'cleanedEvent',
        'drainedEvent',
        'removedEvent',
      ];

      events.forEach(({ event }) => {
        if (!eventsBull.includes(event)) throw new BullException(event);
      });

      return events;
    } catch (error) {
      console.log(error);
    }

    return events;
  }
}

module.exports = BullQueue;
