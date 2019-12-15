require('./config/dotenv');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Sentry = require('@sentry/node');
const Youch = require('youch');
const redis = require('redis');
const RateLimit = require('express-rate-limit');
const RateLimitRedis = require('rate-limit-redis');

require('express-async-errors');
require('./databases');

const routes = require('./resource/routes/api');
const socket = require('../src/resource/routes/ws');
const sentryConfig = require('./config/sentry');
const swagger = require('./resource/swagger');

class App {
  constructor() {
    this.server = express();
    this.socket = socket;

    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(helmet());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15, // 15 minutes
          max: 10,
        })
      );
    }

    if (process.env.NODE_ENV === 'development') this.server.use(...swagger);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Server Error' });
    });
  }
}

module.exports = new App();
