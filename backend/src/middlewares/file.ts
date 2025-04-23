import multer from 'multer'
import { join } from 'path'
import { UPLOAD } from '../config'
import BadRequestError from '../errors/bad-request-error'

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, join(__dirname, `../public/${UPLOAD.temp}`))
})

export const allowedTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
    const fileSizeApprox = Number(req.headers['content-length']) - 180 || 0
    if (fileSizeApprox < 2 * 1024) {
        return cb(new BadRequestError('Файл слишком мал'));
    }
    if (fileSizeApprox > 10 * 1024 * 1024) {
        return cb(new BadRequestError('Файл слишком велик'));
    }
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new BadRequestError('Некорректный тип файла'));
    }
    cb(null, true)
}

export default multer({ storage, fileFilter })
