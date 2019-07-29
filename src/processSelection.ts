
import { 
    ExtensionContext,
    commands,
    Position,
    Selection,
    TextEditor,
    TextDocument,
    Range,
    QuickPickItem,
    QuickPickOptions,
    window

 } from 'vscode';
import CleanText from './helpers/clean_text';
import * as Components from './components';
import OneOffPointer from './helpers/one_offs/one_offs';


function processSelection( task ) {
    const e =   window.activeTextEditor;
    const d =   e.document;
    const sel = e.selections;
    // let replaceRanges: Selection[] = e.selections;

	e.edit( function ( edit ) {
        
		for ( let x = 0; x < sel.length; x++ ) {
			let txt: string = CleanText( d.getText( new Range( sel[x].start, sel[x].end ) ) ).trim();

            if ( txt.length > 0 ){
                txt = task.run( x, txt );

                if ( txt ){
	                // replaceRanges = [];
			        edit.replace( sel[x], txt );
                }
                else{
                    window.showInformationMessage('Looks like something went wrong');
                    return;
                }

            }
            

			// let startPos: Position = new Position(sel[x].start.line, sel[x].start.character);
			// let endPos: Position = new Position(sel[x].start.line + txt.split(/\r\n|\r|\n/).length - 1, sel[x].start.character + txt.length);

			// replaceRanges.push(new Selection(startPos, endPos));
		}
	});

	// e.selections = replaceRanges;

}

export const row =      () => processSelection(new Components.CellConstructor( 'row' ));
export const col =      () => processSelection(new Components.CellConstructor( 'col' ));
export const choice =   () => processSelection(new Components.CellConstructor( 'choice' ));
export const pipe =     () => processSelection(new OneOffPointer('pipe'));
export const strip =    () => processSelection(new OneOffPointer('strip'));
export const radio =    () => processSelection(new Components.QuestionConstructor('radio'));
export const checkbox = () => processSelection(new Components.QuestionConstructor('checkbox'));
export const float =    () => processSelection(new Components.QuestionConstructor('float'));
export const number =   () => processSelection(new Components.QuestionConstructor('number'));
export const select =   () => processSelection(new Components.QuestionConstructor('select'));
export const text =     () => processSelection(new Components.QuestionConstructor('text'));
export const textarea = () => processSelection(new Components.QuestionConstructor('textarea'));
