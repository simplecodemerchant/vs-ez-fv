import { Selection } from 'vscode'
import Window from './window'

export default (x: number, y: number) => {
    const { editor, document, selections } = Window()

    if (editor && selections && document) {
        const cursor = editor.selection.active
        const newCursor = cursor.with(cursor.line + y, cursor.character + x)
        editor.selection = new Selection(newCursor, newCursor)
    }
}
