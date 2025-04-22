import { existsSync, rename, readFileSync, unlink } from 'fs'
import { parse, basename, join } from 'path'
import { fromBuffer } from "file-type";

export const moveFileFromTemp = (imagePath: string, from: string, to: string) => {
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

export const checkFileType = async (filePath: string, allowedTypes: string[]) => {
    const fileBuffer = readFileSync(filePath)
    const fileType = await fromBuffer(fileBuffer)
    const fileTypeMime = fileType?.mime || ''
    return allowedTypes.includes(fileTypeMime)
}

export const removeFile = async (filePath: string) => {
    unlink(filePath,
        (err) => {
            if (err) console.log(err)
        }
    )
}
