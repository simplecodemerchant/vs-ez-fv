'use strict';
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
 import {
     row,
     col,
     choice,
     pipe,
     radio,
     checkbox,
     float,
     number,
     select,
     text,
     textarea,
     strip
 } from './processSelection';


export function activate(context: ExtensionContext) {
    
    const actions = [
        ['extension.ezfvRow',      row],
        ['extension.ezfvCol',      col],
        ['extension.ezfvChoice',   choice],
        ['extension.ezfvPipe',     pipe],
        ['extension.ezfvRadio',    radio],
        ['extension.ezfvCheckbox', checkbox],
        ['extension.ezfvFloat',    float],
        ['extension.ezfvNumber',   number],
        ['extension.ezfvSelect',   select],
        ['extension.ezfvText',     text],
        ['extension.ezfvTextarea', textarea],
        ['extension.ezfvStrip',    strip],
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