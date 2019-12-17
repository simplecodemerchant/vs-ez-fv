export default function CleanText(input: string) {
    let text = input
        .replace(/\n{2,}/g, '\n')
        .replace('\u2019', "'")
        .replace('\u2018', "'")
        .replace('\u201C', '"')
        .replace('\u201D', '"')
        .replace('\u2014', '&amp;mdash;')
        .replace('\u2013', '&amp;ndash;')
        .replace(/&(?!amp;)/g, '&amp;')

    return text
}
