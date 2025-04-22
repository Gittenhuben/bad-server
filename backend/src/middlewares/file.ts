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

const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
    if (file.size < 2 * 1024) {
        return cb(new Error('Файл слишком мал'));
    }
    if (file.size > 10 * 1024 * 1024) {
        return cb(new Error('Файл слишком велик'));
    }
    cb(null, types.includes(file.mimetype))
}    

/*const limits = {
    fileSize: 10 * 1024 * 1024
}*/
/*
const fileFilter = (req, file, cb) => {
    if (file.size < minSize) {
      return cb(new Error('Файл слишком мал'), false);
    }
    cb(null, true);
  };*/

export default multer({ storage, fileFilter/*, limits*/ })
