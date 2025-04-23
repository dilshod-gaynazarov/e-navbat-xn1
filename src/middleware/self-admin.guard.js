import { catchError } from '../utils/error-response.js';

export const SelfGuard = (req, res, next) => {
    try {
        const user = req?.user;
        if (user?.role === 'superadmin' || user.id == req.params.id) {
            next();
        } else {
            catchError(401, 'Forbidden user', res);
        }
    } catch (error) {
        catchError(500, error.message, res);
    }
}