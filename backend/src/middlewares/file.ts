import multer from 'multer'
import { join } from 'path'
import { UPLOAD } from '../config'

/*const storage = multer.diskStorage({
    //destination: (_req, _file, cb) => cb(null, join(__dirname, `../public/${UPLOAD.temp}`))
    destination: (_req, _file, cb) => cb(null, join(__dirname, `../public`))
})*/
/*
const types = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
]*/
/*
const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
    cb(null, types.includes(file.mimetype))
}    

const limits = {
    fileSize: 10 * 1024 * 1024
}
*/
//export default multer({ storage/*, fileFilter, limits*/ })
export default multer({ /*storage*//*, fileFilter, limits*/ })
