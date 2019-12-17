import { Range, Selection } from 'vscode'
import CleanText from './helpers/clean_text'
import * as Components from './components'
import OneOffPointer from './helpers/one_offs/one_offs'
import Window from './helpers/window'
import Cursor from './helpers/cursor'




function processSelection( task: any ) {
    const {
        editor,
        document,
        selections,
        window,
    } = Window();
    
    if (editor && selections && document){
        editor.edit(( edit ) => {
            selections.forEach((sel) => {
                const doc_txt: string = document.getText( new Range( sel.start, sel.end ))
                let txt: string = CleanText( doc_txt ).trim()

                txt = task.run( txt );

                if ( txt.length ) {
                    return edit.replace( sel, txt );
                } else {
                    return window.showInformationMessage('Looks like something went wrong');
                }

            })
        }).then(() => {
            if (task.type === 'pipe'){
                Cursor(13, 0)
            } else if (task.type === 'html'){
                Cursor(9, 1)   
            }
        })
    }
}

export const row =          () => processSelection(new Components.CellConstructor( 'row' ))
export const col =          () => processSelection(new Components.CellConstructor( 'col' ))
export const choice =       () => processSelection(new Components.CellConstructor( 'choice' ))
export const pipe =         () => processSelection(new OneOffPointer( 'pipe' ))
export const group =        () => processSelection(new Components.CellConstructor( 'group' ))
export const strip =        () => processSelection(new OneOffPointer( 'strip' ))
export const radio =        () => processSelection(new Components.QuestionConstructor( 'radio' ))
export const checkbox =     () => processSelection(new Components.QuestionConstructor( 'checkbox' ))
export const float =        () => processSelection(new Components.QuestionConstructor( 'float' ))
export const number =       () => processSelection(new Components.QuestionConstructor( 'number' ))
export const select =       () => processSelection(new Components.QuestionConstructor( 'select' ))
export const text =         () => processSelection(new Components.QuestionConstructor( 'text' ))
export const textarea =     () => processSelection(new Components.QuestionConstructor( 'textarea' ))
export const survey =       () => processSelection(Components.Survey)
export const comment =      () => processSelection(Components.Comment)
export const switch_cells = () => processSelection(Components.Switch)
export const image =        () => processSelection(Components.Image)
export const noAnswer =     () => processSelection(new Components.CellConstructor( 'noanswer' ))
export const html =         () => processSelection(Components.HTML)
