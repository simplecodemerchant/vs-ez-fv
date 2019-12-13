import { CellConstructor } from '../../components';


export default function PipeConstuctor(input: string){
    
    const cc = new CellConstructor('case');

    let pipe_cells = cc.run(input);

    let pipe = 
`<pipe label="" capture="">
${pipe_cells}
</pipe>`
    
    return pipe;
}