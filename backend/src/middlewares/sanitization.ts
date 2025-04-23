import { NextFunction, Request, Response } from 'express'
import sanitizeHtml from 'sanitize-html'

interface DeepSanitizeable {
    [key: string]: DeepSanitizeable | string | null
}

function deepSanitize(obj: DeepSanitizeable) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            deepSanitize(obj[key] as DeepSanitizeable)
        } else if (typeof obj[key] === 'string') {
            obj[key] = sanitizeHtml(obj[key] as string)
        }
    })
}

function sanitize(req: Request, _: Response, next: NextFunction) {
    deepSanitize(req.body)
    return next()
}

export default sanitize
