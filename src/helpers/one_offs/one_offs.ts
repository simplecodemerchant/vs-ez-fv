
import PipeConstuctor from './pipe'
import StripTag from './strip'

export default class OneOffPointer{
    func_list: any
    public type: string
    func: any

    constructor(type: string){

        this.func_list = {
            pipe: PipeConstuctor,
            strip: StripTag
        }
        this.type = type 
        this.func = this.func_list[type]
        
    }

    run(input: string){
        return this.func(input)
    }
    
}