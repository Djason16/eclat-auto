// Pictures chosen in the browser (account documents): resized to 800 px and turned into a small WebP data URL
const MAX_SIDE = 800
const QUALITY = 0.7

export const compressImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('Choisissez une image (JPG, PNG ou WebP)'))
            return
        }
        const url = URL.createObjectURL(file)
        const image = new Image()
        image.onload = () => {
            const scale = Math.min(1, MAX_SIDE / Math.max(image.width, image.height))
            const canvas = document.createElement('canvas')
            canvas.width = Math.round(image.width * scale)
            canvas.height = Math.round(image.height * scale)
            canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height)
            URL.revokeObjectURL(url)
            resolve(canvas.toDataURL('image/webp', QUALITY))
        }
        image.onerror = () => {
            URL.revokeObjectURL(url)
            reject(new Error('Image illisible'))
        }
        image.src = url
    })
