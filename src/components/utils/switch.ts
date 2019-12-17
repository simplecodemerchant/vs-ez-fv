interface DType {
    [key: string]: string
}
export default {
    run: (text: string) => {
        const d: DType = {
            r: 'c',
            c: 'r',
            row: 'col',
            col: 'row',
        }

        const reg = /<(?<tag>row|col)(?<rest>[^>]*?)(?:label="(?<celltype>r|c)(?<celllabel>[0-9a-zA-Z]+)")(?<rest2>[^>]*)>(?<text>[^<]*)<\/(?:row|col)>/g

        let matchArray: string[] = []
        let m

        while ((m = reg.exec(text))) {
            const g: any = m.groups
            matchArray.push(
                `  <${d[g.tag]}${g.rest}label="${d[g.celltype]}${g.celllabel}"${
                    g.rest2
                }>${g.text}</${d[g.tag]}>`
            )
        }

        return matchArray.join('\n')
    },
}
