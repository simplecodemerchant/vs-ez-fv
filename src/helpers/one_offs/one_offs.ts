
import PipeConstuctor from './pipe';
import StripTag from './strip';

export default class OneOffPointer{
    func_list;
    func;

    constructor(type){

        this.func_list = {
            pipe: PipeConstuctor,
            strip: StripTag
        }

        this.func = this.func_list[type];
    }

    run(input){
        return this.func(input);
    }
    
}