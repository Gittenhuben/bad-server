import csrf from 'csurf'
import { NextFunction, Request, Response } from 'express'

export const csrfProtectionToken = csrf({ cookie: true })

function csrfProtection(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'GET') {
        return csrf({ cookie: true })(req, res, next)
    }
    return next()
}

export default csrfProtection
