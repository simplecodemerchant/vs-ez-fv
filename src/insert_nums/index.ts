import Window from '../helpers/window'



class InsertNums{
    startingPoint: number|string;
    e: any;
    d: any;
    sels: any;
    window: any;
    alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

    constructor(sp: number|string){
        this.startingPoint = sp;
    }
    update_window() {
        const {
            editor: e,
            document: d,
            window,
            selections: sels
        } = Window();

        this.e = e;
        this.d = d;
        this.sels = sels;
        this.window = window;
    }
    string_start_point(sp: string, idx: number) {
        const string_array = sp.toString().length;
        const char = String.fromCharCode( 65 + idx )
        // const cur_idx = this.alphabet.indexOf(sp);
        
        // return this.alphabet[cur_idx + 1];
        return char;
    }
    update_starting_point(idx: number) {
        try {
            switch(typeof this.startingPoint){
                case 'number': 
                    this.startingPoint = this.startingPoint + 1;
                    return;
                case 'string':
                    this.startingPoint = this.string_start_point(this.startingPoint, idx);
                    return;
                default:
                    return;
            }
        } catch (e) {
            throw e;
        }
    }
    write(){
        this.update_window()
        
        this.e.edit((edit) => {
            this.sels.forEach((sel, idx) => {
                edit.replace(sel, this.startingPoint.toString());
                this.update_starting_point(idx);
            })
        })

    }

    run(){
        this.write()
    }
}

export default function(){
    const insertnums = new InsertNums('a');

    return insertnums.run();
}
