export default {
    run: (text: string) => {
        const d = {
            'r': 'c',
            'c': 'r',
            'row': 'col',
            'col': 'row'
        }

        const reg = /<(row|col)\s{1,}label="(r|c)\d+"([^>]*)>([^<]*)<\/(row|col)>/g

        let matchArray = []
        let match
        
        while(match = reg.exec(text)){
            console.log(match)
        }

        return text
    }
}