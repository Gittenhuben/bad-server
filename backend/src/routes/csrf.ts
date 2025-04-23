import { Router } from 'express'
import { csrfProtectionToken } from '../middlewares/csrf'
import setCsrf from '../controllers/csrf'

const csrfRouter = Router()

csrfRouter.get('/', csrfProtectionToken, setCsrf)

export default csrfRouter
