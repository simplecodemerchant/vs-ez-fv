import { 
    ExtensionContext,
    commands
} from 'vscode';
import * as ezfv from './processSelection';
import InsertNums from './insert_nums'


export function activate(context: ExtensionContext) {
    
    const actions: readonly [string, () => any][] = [
        // Cells
        ['extension.ezfvRow',        ezfv.row],
        ['extension.ezfvCol',        ezfv.col],
        ['extension.ezfvChoice',     ezfv.choice],
        ['extension.ezfvPipe',       ezfv.pipe],
        ['extension.ezfvGroup',      ezfv.group],

        // Questions
        ['extension.ezfvRadio',      ezfv.radio],
        ['extension.ezfvCheckbox',   ezfv.checkbox],
        ['extension.ezfvFloat',      ezfv.float],
        ['extension.ezfvNumber',     ezfv.number],
        ['extension.ezfvSelect',     ezfv.select],
        ['extension.ezfvText',       ezfv.text],
        ['extension.ezfvTextarea',   ezfv.textarea],
        ['extension.ezfvStrip',      ezfv.strip],

        // Structures
        ['extension.ezfvSurvey',     ezfv.survey],
        ['extension.ezfvComment',    ezfv.comment],
        ['extension.ezfvSwitch',     ezfv.switch_cells],

        // Utilities
        ['extension.ezfvInsertNums', InsertNums],
    ];

    const subs = actions.map((pair): any => {

        const [name, func] = pair;

        return commands.registerCommand(...pair);

    });

    context.subscriptions.push(...subs);
}




// this method is called when your extension is deactivated
export function deactivate() {
}