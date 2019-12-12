import { CellConstructor } from '../../components';


export default function PipeConstuctor(input){
    const cc = new CellConstructor('case');

    let pipe_cells = cc.run(0, input);

    let pipe = 
`<pipe label="" capture="">
${pipe_cells}
</pipe>`;
    
    return pipe;
}