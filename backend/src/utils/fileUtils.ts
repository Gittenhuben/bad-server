import { existsSync, rename } from 'fs'
import { parse, basename, join } from 'path'

function moveFile(imagePath: string, from: string, to: string) {
    const oldFileName = parse(imagePath).name
    const oldFileNameWithPath = join(from, oldFileName)
    const newFileName = basename(imagePath)
    const newFileNameWithPath = join(to, newFileName)

    if (!existsSync(oldFileNameWithPath)) {
        throw new Error('Ошибка при сохранении файла')
    }

    rename(oldFileNameWithPath, newFileNameWithPath, (err) => {
        if (err) {
            throw new Error('Ошибка при сохранении файла')
        }
    })
}

export default moveFile
