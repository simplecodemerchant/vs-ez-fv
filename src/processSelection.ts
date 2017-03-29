
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


function processSelection( e: TextEditor, d: TextDocument, sel: Selection[], task ) {
    let replaceRanges: Selection[] = e.selections;

	e.edit( function ( edit ) {
        
		for ( var x = 0; x < sel.length; x++ ) {
			let txt: string = CleanText( d.getText( new Range( sel[x].start, sel[x].end ) ) ).trim();

            if ( txt.length > 0 ){
                txt = task.run( x, txt );

                if ( txt ){
	                replaceRanges = [];
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



export default function ezfv( opt ){

        let e = window.activeTextEditor;
        let d = e.document;
        let sel = e.selections;

        try{

            if ( ['row','col','choice'].indexOf(opt) !== -1 ) {
                processSelection( e,d,sel, new Components.CellConstructor( opt ) );                
            }
            
            else if ( ['radio','checkbox','float','number','select','text','textarea'].indexOf(opt) !== -1 ) {
                processSelection( e,d,sel, new Components.QuestionConstructor( opt ) );
            }

            else if ( ['pipe','strip'].indexOf(opt) !== -1 ) {
                processSelection( e,d,sel, new OneOffPointer( opt ) );
            }

            else {
                window.showInformationMessage('Looks like something went wrong');
            }

        }
        catch(e){
            console.log(e);
        }
        

}