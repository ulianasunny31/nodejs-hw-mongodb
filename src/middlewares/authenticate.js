import createHttpError from 'http-errors';
import { SessionCollection } from '../db/model/session.js';
import { UsersCollection } from '../db/model/auth.js';

export async function authenticate(req, res, next) {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide authorization header'));
    return;
  }

  const [bearer, token] = [authHeader.split(' ')[0], authHeader.split(' ')[1]];
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Authorization header should be of type Bearer'));
    return;
  }

  const session = await SessionCollection.findOne({ accessToken: token });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isSessionExpired = new Date() > new Date(session.accessTokenValidUntil);
  if (isSessionExpired) {
    next(createHttpError(401, 'Access token has expired'));
    return;
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  req.user = user;
  next();
}
