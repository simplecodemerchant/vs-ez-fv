import { Range } from 'vscode'
import CleanText from './helpers/clean_text'
import * as Components from './components'
import OneOffPointer from './helpers/one_offs/one_offs'
import Window from './helpers/window'




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
                let txt: string = CleanText( document.getText( new Range( sel.start, sel.end ) ) ).trim();

                txt = task.run( txt );

                if ( txt.length ) {
                    return edit.replace( sel, txt );
                } else {
                    return window.showInformationMessage('Looks like something went wrong');
                }
            })
        })
    }
}

export const row =      () => processSelection(new Components.CellConstructor( 'row' ))
export const col =      () => processSelection(new Components.CellConstructor( 'col' ))
export const choice =   () => processSelection(new Components.CellConstructor( 'choice' ))
export const pipe =     () => processSelection(new OneOffPointer( 'pipe' ))
export const strip =    () => processSelection(new OneOffPointer( 'strip' ))
export const radio =    () => processSelection(new Components.QuestionConstructor( 'radio' ))
export const checkbox = () => processSelection(new Components.QuestionConstructor( 'checkbox' ))
export const float =    () => processSelection(new Components.QuestionConstructor( 'float' ))
export const number =   () => processSelection(new Components.QuestionConstructor( 'number' ))
export const select =   () => processSelection(new Components.QuestionConstructor( 'select' ))
export const text =     () => processSelection(new Components.QuestionConstructor( 'text' ))
export const textarea = () => processSelection(new Components.QuestionConstructor( 'textarea' ))
