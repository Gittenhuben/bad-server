import { Router } from 'express'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/products'
import { validateProductId, validateProductBody, validateProductUpdateBody } from '../middlewares/validations'
import sanitize from '../middlewares/sanitization'
import auth, { roleGuardMiddleware } from '../middlewares/auth'
import { Role } from '../models/user'

const productRouter = Router()

productRouter.get('/', getProducts)
productRouter.post(
    '/',
    auth,
    roleGuardMiddleware(Role.Admin),
    sanitize,
    validateProductBody,
    createProduct
)
productRouter.delete(
    '/:productId',
    auth,
    roleGuardMiddleware(Role.Admin),
    validateProductId,
    deleteProduct
)
productRouter.patch(
    '/:productId',
    auth,
    roleGuardMiddleware(Role.Admin),
    sanitize,
    validateProductId,
    validateProductUpdateBody,
    updateProduct
)

export default productRouter
