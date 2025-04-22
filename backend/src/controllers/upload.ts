import { NextFunction, Request, Response } from 'express'
import { constants } from 'http2'
import { extname } from 'path'
import BadRequestError from '../errors/bad-request-error'
import { UPLOAD } from '../config'
import { allowedTypes } from '../middlewares/file'
import { checkFileType, removeFile } from '../utils/fileUtils'

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    
    if (!(await checkFileType(req.file.path, allowedTypes))) {
        removeFile(req.file.path)
        return next(new BadRequestError('Некорректный тип содержимого файла'))
    }

    try {
        const fileNameWithExtension = req.file.filename + extname(req.file.originalname)
        const filePath = `/${UPLOAD.path}/${fileNameWithExtension}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName: filePath,
            originalName: req.file.originalname,
        })
    } catch (error) {
        return next(error)
    }
}

export default {}
