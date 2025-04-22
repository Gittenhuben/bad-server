import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { extname } from 'path'
import BadRequestError from '../errors/bad-request-error'
import { UPLOAD } from '../config'

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        //return next(new BadRequestError('Файл не загружен'))
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName: 'aaaaa2.png',
            originalName: 'bbbbb.png'
        })
    }
    try {
        const fileNameWithExtension = req.file.filename + extname(req.file.originalname)
        const filePath = UPLOAD.path
            ? `/${UPLOAD.path}/${fileNameWithExtension}`
            : `/${fileNameWithExtension}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName: filePath,
            originalName: req.file.originalname,
        })
    } catch (error) {
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName: 'aaaaa.png',
            originalName: req.file.originalname
        })
        //return next(error)
    }
}

export default {}
