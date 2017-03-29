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
 import ezfv from './processSelection';


export function activate(context: ExtensionContext) {
    console.log('ez-fv has been loaded.');

    var row        = commands.registerCommand('extension.ezfvRow', () =>        { ezfv('row') });
    var col        = commands.registerCommand('extension.ezfvCol', () =>        { ezfv('col') });
    var choice     = commands.registerCommand('extension.ezfvChoice', () =>     { ezfv('choice') });
    var pipe       = commands.registerCommand('extension.ezfvPipe', () =>       { ezfv('pipe') });

    var radio      = commands.registerCommand('extension.ezfvRadio', () =>      { ezfv('radio') });
    var checkbox   = commands.registerCommand('extension.ezfvCheckbox', () =>   { ezfv('checkbox') });
    var float      = commands.registerCommand('extension.ezfvFloat', () =>      { ezfv('float') });
    var number     = commands.registerCommand('extension.ezfvNumber', () =>     { ezfv('number') });
    var select     = commands.registerCommand('extension.ezfvSelect', () =>     { ezfv('select') });
    var text       = commands.registerCommand('extension.ezfvText', () =>       { ezfv('text') });
    var textarea   = commands.registerCommand('extension.ezfvTextarea', () =>   { ezfv('textarea') });

    var strip      = commands.registerCommand('extension.ezfvStrip', () =>      { ezfv('strip') });


    context.subscriptions.push(
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
    );
}




// this method is called when your extension is deactivated
export function deactivate() {
}