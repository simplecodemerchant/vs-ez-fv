import { Range, Selection } from 'vscode'
import CleanText from './helpers/clean_text'
import * as Components from './components'
import OneOffPointer from './helpers/one_offs/one_offs'
import Window from './helpers/window'
import Cursor from './helpers/cursor'

function processSelection(task: any) {
    const { editor, document, selections, window } = Window()

    if (editor && selections && document) {
        editor
            .edit(edit => {
                selections.forEach(sel => {
                    const doc_txt: string = document.getText(
                        new Range(sel.start, sel.end)
                    )
                    let txt: string = CleanText(doc_txt).trim()

                    txt = task.run(txt)

                    if (txt.length) {
                        return edit.replace(sel, txt)
                    } else {
                        return window.showInformationMessage(
                            'Looks like something went wrong'
                        )
                    }
                })
            })
            .then(() => {
                if (task.type === 'pipe') {
                    Cursor(13, 0)
                } else if (task.type === 'html') {
                    Cursor(9, 1)
                }
            })
    }
}
export default {
    row: () => processSelection(new Components.CellConstructor('row')),
    col: () => processSelection(new Components.CellConstructor('col')),
    choice: () => processSelection(new Components.CellConstructor('choice')),
    pipe: () => processSelection(new OneOffPointer('pipe')),
    group: () => processSelection(new Components.CellConstructor('group')),
    strip: () => processSelection(new OneOffPointer('strip')),
    radio: () => processSelection(new Components.QuestionConstructor('radio')),
    checkbox: () =>
        processSelection(new Components.QuestionConstructor('checkbox')),
    float: () => processSelection(new Components.QuestionConstructor('float')),
    number: () =>
        processSelection(new Components.QuestionConstructor('number')),
    select: () =>
        processSelection(new Components.QuestionConstructor('select')),
    text: () => processSelection(new Components.QuestionConstructor('text')),
    textarea: () =>
        processSelection(new Components.QuestionConstructor('textarea')),
    survey: () => processSelection(Components.Survey),
    comment: () => processSelection(Components.Comment),
    switch_cells: () => processSelection(Components.Switch),
    image: () => processSelection(Components.Image),
    noAnswer: () =>
        processSelection(new Components.CellConstructor('noanswer')),
    html: () => processSelection(Components.HTML),
}
