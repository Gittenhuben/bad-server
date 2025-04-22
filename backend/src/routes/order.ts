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
import { roleGuardMiddleware } from '../middlewares/auth'
import { validateOrderBody, validateOrderNumber } from '../middlewares/validations'
import sanitize from '../middlewares/sanitization'
import { Role } from '../models/user'

const orderRouter = Router()

orderRouter.post('/', sanitize, validateOrderBody, createOrder)
orderRouter.get('/all', roleGuardMiddleware(Role.Admin), getOrders)
orderRouter.get('/all/me', getOrdersCurrentUser)
orderRouter.get('/:orderNumber', roleGuardMiddleware(Role.Admin), validateOrderNumber, getOrderByNumber)
orderRouter.get('/me/:orderNumber', validateOrderNumber, getOrderCurrentUserByNumber)
orderRouter.patch('/:orderNumber', roleGuardMiddleware(Role.Admin), sanitize, updateOrder)
orderRouter.delete('/:id', roleGuardMiddleware(Role.Admin), deleteOrder)

export default orderRouter
