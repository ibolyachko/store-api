// Instruments
import { NotFoundError } from './';

export const permissions = (req, res, next) => {
    if (!req.session.user) {
        return next(new NotFoundError('authentication failed', 401));
    }

    const { role, hash: userHash } = req.session.user;
    const { hash } = req.params;

    // By profile permissions
    if (hash && userHash === hash) {
        return next();
    }

    // Staff permissions
    if (role) {
        next();
    } else {
        next(new NotFoundError('access denied', 403));
    }
};
