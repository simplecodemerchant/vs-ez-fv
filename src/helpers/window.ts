import { window } from 'vscode'


export default function(){

    const editor =     window.activeTextEditor
    const document =   editor ? editor.document : undefined
    const selections = editor ? editor.selections : undefined
    

    return {
        window,
        editor,
        document,
        selections
    }
}

