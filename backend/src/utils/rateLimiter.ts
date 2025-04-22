import { rateLimit } from 'express-rate-limit'
import { RATE_LIMIT } from '../config'

const limiter = rateLimit({
    windowMs: RATE_LIMIT.windowMs,
    limit: RATE_LIMIT.limit,
    standardHeaders: true,
    legacyHeaders: false,
})

export default limiter
