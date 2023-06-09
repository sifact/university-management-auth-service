import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';

import { ApiError } from '../../errors/ApiError';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import { handleZodError } from '../../errors/handleZodError';

// global error handler
const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('globalErrorHandler ~', err)
    : errorLogger.error('globalErrorHandler ~', err);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    console.log('validationError');
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // apiError
  else if (err instanceof ApiError) {
    console.log('Error api');
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  // zodError
  else if (err instanceof ZodError) {
    console.log('error zodError');
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  }
  // instance of Error
  else if (err instanceof Error) {
    console.log('error instance');
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : null,
  });
  next();
};

export default globalErrorHandler;
