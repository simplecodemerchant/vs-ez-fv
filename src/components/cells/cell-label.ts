function matchArray(arr: string[], reg: RegExp): any[] {
    let matches = []

    for (let str of arr) {
        let match = str.match(reg)

        if (!match) {
            return []
        }

        matches.push(match.slice(1))
    }

    return matches
}

export interface Match {
    label: string
    content: string
}

export default function CellLabelConstructor(
    label: string,
    input: string
): Match[] {
    let matches: Match[] = []
    const input_rows = input.split(/\r\n|\r|\n/)

    const re1: RegExp = /(\d{1,4})(?:[\.\)\]]{1})\s*(.*)/
    const reCatchAll: RegExp = /(.*)/

    const matches_re1 = matchArray(input_rows, re1)
    const matches_reCatchAll = matchArray(input_rows, reCatchAll)

    if (matches_re1.length) {
        matches = matches_re1.map(
            (el): Match => ({ label: `${label}${el[0]}`, content: el[1] })
        )
    } else if (matches_reCatchAll.length) {
        matches = matches_reCatchAll.map(
            (el, idx): Match => ({
                label: `${label}${idx + 1}`,
                content: el[0],
            })
        )
    }
    return matches
}
