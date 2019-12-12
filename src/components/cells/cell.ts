import CellLabelConstructor from './cell-label';

type CellType = 'row' | 'col' | 'choice' | 'case'

export default class CellConstructor{
    type:CellType ;
    extra:string = "";
    prelabel:string;
    extraCheck:RegExp;

    constructor(type){
        this.type = type;
    }

    run(idx, input){

        switch(this.type){
            case 'row':
                this.prelabel = 'r'
                this.extraCheck = /(other.*?specify)/i;
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
            default:
                break;
        }

        let cells = CellLabelConstructor( this.prelabel, idx, input );

        if ( this.type === 'case' ) { cells.push({label: 'c999', content: 'BAD PIPE'}) }

        cells = cells.map( ({label, content}, idx) => {
        
            if ( this.type === 'row' && this.extraCheck.test(content) ){
                this.extra = ' open="1" openSize="25" randomize="0"'
            }
            if ( this.type === 'case'){
                this.extra = ( (idx+1) === cells.length ) ? ' cond="1"' : ' cond=""';
            }

            return `  <${this.type} label="${label}"${this.extra}>${content.trim()}</${this.type}>`
        });

    return cells.join('\n');
    }
}
