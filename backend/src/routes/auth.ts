import { Router } from 'express'
import {
    getCurrentUser,
    getCurrentUserRoles,
    login,
    logout,
    refreshAccessToken,
    register,
    updateCurrentUser,
} from '../controllers/auth'
import auth from '../middlewares/auth'
import { validateUserBody, validateAuthentication } from '../middlewares/validations'
import sanitize from '../middlewares/sanitization'

const authRouter = Router()

authRouter.get('/user', auth, getCurrentUser)
authRouter.patch('/me', auth, sanitize, updateCurrentUser)
authRouter.get('/user/roles', auth, getCurrentUserRoles)
authRouter.post('/login', sanitize, validateAuthentication, login)
authRouter.get('/token', refreshAccessToken)
authRouter.get('/logout', logout)
authRouter.post('/register', sanitize, validateUserBody, register)

export default authRouter
