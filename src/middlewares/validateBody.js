import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (e) {
      const errors = e.details.map((detail) => detail.message);
      const err = createHttpError(400, {
        message: `Invalid request body:${errors}`,
      });
      next(err);
    }
  };
};
