import { 
    ExtensionContext,
    commands
} from 'vscode';
import * as ezfv from './processSelection';
import InsertNums from './insert_nums'


export function activate(context: ExtensionContext) {
    
    const actions = [
        ['extension.ezfvRow',        ezfv.row],
        ['extension.ezfvCol',        ezfv.col],
        ['extension.ezfvChoice',     ezfv.choice],
        ['extension.ezfvPipe',       ezfv.pipe],
        ['extension.ezfvRadio',      ezfv.radio],
        ['extension.ezfvCheckbox',   ezfv.checkbox],
        ['extension.ezfvFloat',      ezfv.float],
        ['extension.ezfvNumber',     ezfv.number],
        ['extension.ezfvSelect',     ezfv.select],
        ['extension.ezfvText',       ezfv.text],
        ['extension.ezfvTextarea',   ezfv.textarea],
        ['extension.ezfvStrip',      ezfv.strip],
        ['extension.ezfvInsertNums', InsertNums],
    ];

    const subs = actions.map((pair: [string, any]): any => {

        const [name, func] = pair;

        return commands.registerCommand(name, func);

    });

    context.subscriptions.push(...subs);
}




// this method is called when your extension is deactivated
export function deactivate() {
}