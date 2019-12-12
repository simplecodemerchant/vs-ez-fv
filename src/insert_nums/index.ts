import Window from '../helpers/window'
import { type } from 'os';



class InsertNums{

    starting_point: any;
    current: any;
    e: any;
    d: any;
    sels: any;
    window: any;
    // alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alpha: boolean = false;
    upperCase: boolean = true;

    constructor(sp: number|string){
        // this.starting_point = sp
        this.current = sp

        if (typeof(sp) === 'string'){
            this.alpha = true
            
            if (sp === sp.toLocaleLowerCase()){
                this.upperCase = false
            }
        }

    }
    
    get_window() {
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

    alpha_to_num(l){
        return l.split('').reduce((r, x) => r * 26 + parseInt(x, 36) - 9, 0) - 1;
    }

    num_to_alpha(i){
        let num: any = i + 1
        let ret: any = ''
      
        for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
          ret = String.fromCharCode(parseInt(`${(num % b) / a}`) + 65) + ret
        }

        return ret
    }

    update() {
        try {
            if (this.alpha){
                const idx: number = this.alpha_to_num(this.current)
                const alpha: string = this.num_to_alpha(idx + 1)
                this.current = this.upperCase ? alpha.toUpperCase() : alpha.toLowerCase()
            } else {
                this.current = this.current + 1
            }
        } catch (e) {
            throw e
        }
    }

    write(){
        this.get_window()
        
        this.e.edit((edit) => {
            this.sels.forEach((sel) => {
                
                edit.replace(sel, this.current.toString());
                this.update();
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
