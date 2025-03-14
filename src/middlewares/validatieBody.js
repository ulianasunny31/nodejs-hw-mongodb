import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (e) {
      const err = createHttpError.BadRequest({
        message: e.message,
      });
      next(err);
    }
  };
};
