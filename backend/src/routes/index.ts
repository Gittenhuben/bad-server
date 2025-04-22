import { NextFunction, Request, Response, Router } from 'express'
import NotFoundError from '../errors/not-found-error'
import authRouter from './auth'
import customerRouter from './customers'
import orderRouter from './order'
import productRouter from './product'
import uploadRouter from './upload'
import csrfRouter from './csrf'
import csrfProtection from '../middlewares/csrf'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import { Role } from '../models/user'

const router = Router()

router.use('/csrf-token', csrfRouter)
router.use('/auth', authRouter)
router.use('/product', csrfProtection, productRouter)
router.use('/order', orderRouter)
router.use('/upload', /*auth, roleGuardMiddleware(Role.Admin),*/ uploadRouter)
router.use('/customers', csrfProtection, auth, roleGuardMiddleware(Role.Admin), customerRouter)

router.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError('Маршрут не найден'))
})

export default router
