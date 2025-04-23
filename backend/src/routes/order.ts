import { Router } from 'express'
import {
    createOrder,
    deleteOrder,
    getOrderByNumber,
    getOrderCurrentUserByNumber,
    getOrders,
    getOrdersCurrentUser,
    updateOrder,
} from '../controllers/order'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import { validateOrderBody, validateOrderNumber } from '../middlewares/validations'
import sanitize from '../middlewares/sanitization'
import { Role } from '../models/user'
import csrfProtection from '../middlewares/csrf'

const orderRouter = Router()

orderRouter.post('/', auth, sanitize, validateOrderBody, createOrder)
orderRouter.get('/all', auth, roleGuardMiddleware(Role.Admin), getOrders)
orderRouter.get('/all/me', auth, getOrdersCurrentUser)
orderRouter.get('/:orderNumber', auth, roleGuardMiddleware(Role.Admin), validateOrderNumber, getOrderByNumber)
orderRouter.get('/me/:orderNumber', auth, validateOrderNumber, getOrderCurrentUserByNumber)
orderRouter.patch('/:orderNumber', /*csrfProtection,*/ auth, roleGuardMiddleware(Role.Admin), sanitize, updateOrder)
orderRouter.delete('/:id', /*csrfProtection,*/ auth, roleGuardMiddleware(Role.Admin), deleteOrder)

export default orderRouter
