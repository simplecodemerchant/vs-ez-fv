
export default function StripTag(input: string) {
    const find_text = /<.*? label=".*?"[^>]*>([^<]*)<\/.*?>/g

    let matchArry: string[] = []
    let match: RegExpExecArray|null

    while(match = find_text.exec(input)){
        matchArry.push(match[1])
    }

    return matchArry.join('\n')

}