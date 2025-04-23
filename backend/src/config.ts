import 'dotenv/config'
import { CookieOptions } from 'express'
import ms from 'ms'

export const { PORT = '3000' } = process.env
export const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/weblarek' } = process.env
export const { JWT_SECRET = 'JWT_SECRET' } = process.env
export const { ORIGIN_ALLOW = 'http://localhost:5173' } = process.env

export const ACCESS_TOKEN = {
    secret: process.env.AUTH_ACCESS_TOKEN_SECRET || 'secret-dev',
    expiry: process.env.AUTH_ACCESS_TOKEN_EXPIRY || '10m',
}
export const REFRESH_TOKEN = {
    secret: process.env.AUTH_REFRESH_TOKEN_SECRET || 'secret-dev',
    expiry: process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d',
    cookie: {
        name: 'refreshToken',
        options: {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            maxAge: ms(process.env.AUTH_REFRESH_TOKEN_EXPIRY || '7d'),
            path: '/',
        } as CookieOptions,
    },
}

export const RATE_LIMIT = {
    enabled: process.env.RATE_LIMITED === 'true',
    windowMs: Number(process.env.RATE_LIMIT_DURATION) * 1000 || 60 * 1000,
    limit: Number(process.env.RATE_LIMIT_POINTS) || 1000
}

export const CACHE = {
    static: Number(process.env.CACHE_STATIC_DURATION) || 86400,
    products: Number(process.env.CACHE_PRODUCTS_DURATION) || 60
}

export const UPLOAD = {
    path: process.env.UPLOAD_PATH || 'images',
    temp: process.env.UPLOAD_PATH_TEMP || 'uploads',
}
