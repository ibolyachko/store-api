// Instruments
import { NotFoundError } from './';

export const authenticate = (req, res, next) => {
    if (!req.session.user) {
        return next(new NotFoundError('authentication failed', 401));
    }

    const { hash } = req.session.user;

    if (hash) {
        next();
    } else {
        next(new NotFoundError('authentication failed', 401));
    }
};
