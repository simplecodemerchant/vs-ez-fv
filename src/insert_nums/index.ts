import Window from '../helpers/window'
import { window, TextEditorEdit, Selection } from 'vscode'

class InsertNums {
    current: any
    e: any
    sels: any
    alpha: boolean = false
    upperCase: boolean = true

    constructor(sp: any) {
        const { editor, selections } = Window()
        this.e = editor
        this.sels = selections

        this.current = sp || 1

        if (isNaN(sp) && typeof sp === 'string') {
            this.alpha = true

            if (sp === sp.toLocaleLowerCase()) {
                this.upperCase = false
            }
        }
    }

    alpha_to_num(l: string) {
        return l.split('').reduce((r, x) => r * 26 + parseInt(x, 36) - 9, 0) - 1
    }

    num_to_alpha(i: number) {
        let num: any = i + 1
        let ret: any = ''

        for (let a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(parseInt(`${(num % b) / a}`) + 65) + ret
        }

        return ret
    }

    update() {
        try {
            if (this.alpha) {
                const idx: number = this.alpha_to_num(this.current)
                const alpha: string = this.num_to_alpha(idx + 1)
                this.current = this.upperCase
                    ? alpha.toUpperCase()
                    : alpha.toLowerCase()
            } else {
                this.current = +this.current + 1
            }
        } catch (e) {
            throw e
        }
    }

    run() {
        this.e.edit((edit: TextEditorEdit) => {
            this.sels.forEach((sel: Selection) => {
                edit.replace(sel, this.current.toString())
                this.update()
            })
        })
    }
}

export default async function() {
    const starting_point = await window.showInputBox({
        placeHolder: 'Enter a starting point',
    })

    const insertnums = new InsertNums(starting_point)

    return insertnums.run()
}
