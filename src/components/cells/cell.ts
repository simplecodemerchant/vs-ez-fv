import CellLabelConstructor, { Match } from './cell-label';

type CellType = 'row' | 'col' | 'choice' | 'case' | 'group'

export default class CellConstructor{
    public type:CellType
    extra:string = ''
    prelabel:string = ''
    extraCheck:RegExp | undefined = undefined

    constructor(type: CellType){
        this.type = type
    }

    run(input: string){

        switch(this.type){
            case 'row':
                this.prelabel = 'r'
                this.extraCheck = /(other.*?specify)/i
                break;
            case 'col':
                this.prelabel = 'c'
                break;
            case 'choice':
                this.prelabel = 'ch'
                break;
            case 'case':
                this.prelabel = 'c'
                break;
            case 'group':
                this.prelabel = 'g'
                break;
            default:
                break;
        }
        
        let constructed_cells: Match[] = CellLabelConstructor( this.prelabel, input );

        if ( this.type === 'case' ) { constructed_cells.push({label: 'c999', content: 'BAD PIPE'}) }
        

        let cells = constructed_cells.map( ({label, content}: Match, idx): string => {
        
            if ( this.type === 'row' && this.extraCheck && this.extraCheck.test(content) ){
                this.extra = ' open="1" openSize="25" randomize="0"'
            }
            if ( this.type === 'case'){
                this.extra = ( (idx+1) === constructed_cells.length ) ? ' cond="1"' : ' cond=""'
            }

            return `  <${this.type} label="${label}"${this.extra}>${content.trim()}</${this.type}>`
        });
        

    return cells.join('\n')
    }
}
