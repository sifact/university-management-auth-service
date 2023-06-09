import mongoose from 'mongoose';

import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

async function main() {
  let server: Server;

  try {
    await mongoose.connect(config.databaseURL as string);
    logger.info(`Database is connected...`);

    server = app.listen(config.port, () => {
      logger.info(`UM server is running on ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect database`, error);
  }

  process.on('unhandledRejection', err => {
    console.log(
      'Unhandled Rejection is detected, we are closing our server...'
    );

    if (server) {
      console.log('inside');

      server.close(() => {
        console.log('inside close');
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

// synchronous process

// process.on('uncaughtException', err => {
//   console.log('Uncaught Exception is detected we are closing our server...')
//   process.exit(1)
// })

// main().catch(err => console.log(err))
