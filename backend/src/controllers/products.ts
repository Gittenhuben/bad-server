import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { Error as MongooseError } from 'mongoose'
import { join } from 'path'
import BadRequestError from '../errors/bad-request-error'
import ConflictError from '../errors/conflict-error'
import NotFoundError from '../errors/not-found-error'
import Product from '../models/product'
import moveFile from '../utils/fileUtils'
import { CACHE, UPLOAD } from '../config'

// GET /product
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page = 1, limit = 5 } = req.query
        const options = {
            skip: (Number(page) - 1) * Number(limit),
            limit: Number(limit),
            sort: { _id: 1 }
        }
        const fields = [
            '_id',
            'title',
            'category',
            'description',
            'price',
            'image.fileName'
        ]
        const products = await Product.find({}, fields, options)
        const totalProducts = await Product.countDocuments({})
        const totalPages = Math.ceil(totalProducts / Number(limit))
        
        if (!req.query.page) {
            res.setHeader('Cache-Control', `public, max-age=${CACHE.products}`)
        }
        return res.send({
            items: products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: Number(page),
                pageSize: Number(limit),
            },
        })
    } catch (err) {
        return next(err)
    }
}

// POST /product
const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { description, category, price, title, image } = req.body
        const product = await Product.create({
            description,
            image,
            category,
            price,
            title,
        })
        
        // Переносим картинку из временной папки
        if (image) {
            moveFile(
                image.fileName,
                join(__dirname, `../public/${UPLOAD.temp}`),
                join(__dirname, `../public/${UPLOAD.path}`)
            )
        }

        return res.status(constants.HTTP_STATUS_CREATED).send(product)
    } catch (error) {
        if (error instanceof MongooseError.ValidationError) {
            return next(new BadRequestError(error.message))
        }
        if (error instanceof Error && error.message.includes('E11000')) {
            return next(
                new ConflictError('Товар с таким заголовком уже существует')
            )
        }
        return next(error)
    }
}

// PUT /product
const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productId } = req.params
        const { image } = req.body

        const product = await Product.findByIdAndUpdate(
            productId,
            {
                $set: {
                    ...req.body,
                    price: req.body.price ? req.body.price : null,
                    image: req.body.image ? req.body.image : undefined,
                },
            },
            { runValidators: true, new: true }
        ).orFail(() => new NotFoundError('Нет товара по заданному id'))

        // Переносим картинку из временной папки
        if (image) {
            moveFile(
                image.fileName,
                join(__dirname, `../public/${UPLOAD.temp}`),
                join(__dirname, `../public/${UPLOAD.path}`)
            )
        }  

        return res.send(product)
    } catch (error) {
        if (error instanceof MongooseError.ValidationError) {
            return next(new BadRequestError(error.message))
        }
        if (error instanceof MongooseError.CastError) {
            return next(new BadRequestError('Передан не валидный ID товара'))
        }
        if (error instanceof Error && error.message.includes('E11000')) {
            return next(
                new ConflictError('Товар с таким заголовком уже существует')
            )
        }
        return next(error)
    }
}

// DELETE /product
const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { productId } = req.params
        const product = await Product.findByIdAndDelete(productId).orFail(
            () => new NotFoundError('Нет товара по заданному id')
        )
        return res.send(product)
    } catch (error) {
        if (error instanceof MongooseError.CastError) {
            return next(new BadRequestError('Передан не валидный ID товара'))
        }
        return next(error)
    }
}

export { createProduct, deleteProduct, getProducts, updateProduct }
