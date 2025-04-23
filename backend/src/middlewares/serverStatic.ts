import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function serveStatic(baseDir: string, maxAge?: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Определяем полный путь к запрашиваемому файлу
        const filePath = path.join(baseDir, req.path)

        // Проверяем, существует ли файл
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // Файл не существует отдаем дальше мидлварам
                return next()
            }

            fs.stat(filePath, (err, stats) => {
                if (err || !stats.isFile()) {
                    return next()
                }

                // Файл существует, отправляем его клиенту
                if (maxAge) {
                    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
                }
                return res.sendFile(filePath, (err) => {
                    if (err) {
                        next(err)
                    }
                })
            })
        })
    }
}
