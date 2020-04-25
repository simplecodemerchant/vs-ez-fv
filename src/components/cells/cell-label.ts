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

    const re1: RegExp = /^\s*(\d{1,4})(?:[\.\)\]]{1})\s*(.*)$/
    const re2: RegExp = /^\s*([a-zA-Z]{1,4})(?:[\.\)\]]{1})\s*(.*)$/
    const re3: RegExp = /^\s*([a-zA-Z0-9]{1,4})(?:[\.\)\]]{1})\s*(.*)$/
    const reCatchAll: RegExp = /^(.*)$/

    const matches_re1 = matchArray(input_rows, re1)
    const matches_re2 = matchArray(input_rows, re2)
    const matches_re3 = matchArray(input_rows, re3)
    const matches_reCatchAll = matchArray(input_rows, reCatchAll)

    if (matches_re1.length) {
        matches = matches_re1.map(
            (el): Match => ({ label: `${label}${el[0]}`, content: el[1] })
        )
    } 
    if (matches_re2.length) {
        matches = matches_re2.map(
            (el): Match => ({ label: `${label}${el[0]}`, content: el[1] })
        )
    } 
    else if (matches_re3.length) {
        matches = matches_re3.map(
            (el): Match => ({ label: `${label}${el[0]}`, content: el[1] })
        )
    } 
    else if (matches_reCatchAll.length) {
        matches = matches_reCatchAll.map(
            (el, idx): Match => ({
                label: `${label}${idx + 1}`,
                content: el[0],
            })
        )
    }
    return matches
}
