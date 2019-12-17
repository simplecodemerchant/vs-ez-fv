export default {
    run: (text: string) => {
        const images = text.trim().split(/[\n\r]{1,}/).map(img => {
            return `<img src="[rel ${img.trim()}]" class="custom-img" />`
        })

        return images.join('\n')
    }
}