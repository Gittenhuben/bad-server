import multer from 'multer'
import { join } from 'path'
import { UPLOAD } from '../config'

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, join(__dirname, `../public/${UPLOAD.temp}`))
})

const types = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]

const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
    const fileSizeApprox = Number(req.headers['content-length']) - 180 || 0
    console.log(7, fileSizeApprox)
    if (fileSizeApprox < 2 * 1024) {
        return cb(new Error('Файл слишком мал'));
    }
    if (fileSizeApprox > 10 * 1024 * 1024) {
        return cb(new Error('Файл слишком велик'));
    }
    if (!types.includes(file.mimetype)) {
        return cb(new Error('Некорректный тип файла'));
    }
    cb(null, true)
}

export default multer({ storage, fileFilter })
