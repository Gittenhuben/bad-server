import { NextFunction, Request, Response } from 'express'

const setCsrf = async (req: Request, res: Response, _: NextFunction) => {
    return typeof req.csrfToken === 'function' ? res.json(req.csrfToken()) : res.json('')
}

export default setCsrf
