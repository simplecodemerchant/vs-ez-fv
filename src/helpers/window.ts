import {
    window
} from 'vscode';

export default function(){
    const e =    window.activeTextEditor;
    const d =    e.document;
    const sels = e.selections;

    return {
        window,
        editor: e,
        document: d,
        selections: sels
    }
}

