import * as vscode from "vscode";
import { Command } from "../../entities/command.entity";
import {
    cmdAddCommentLine,
    cmdCopyLineDown,
    cmdGetEditorDefinition,
    cmdHelloTwitch,
    cmdURIForCommentLine,
} from "./commands/all.command";
import { cmdSuccess } from "./commands/cmdSuccess.command";

export class CommandManager {
    private _context: vscode.ExtensionContext;
    private _registeredCommands: Array<Command> = [];

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
        // Commands that are auto executed
        this.addRegisteredCommands();
    }

    public initCommands() {
        this._registeredCommands.forEach((command) => {
            if (command.IsAutoCallable) {
                command.CommandFn();
            } else {
                this.registerCommand(command.CommandId, command.CommandFn, command.Timeout);
            }
        });
    }

    /* Register all commands */
    private addRegisteredCommands() {
        /* Add new commands here */
        this._registeredCommands.push(cmdAddCommentLine);
        this._registeredCommands.push(cmdGetEditorDefinition);
        this._registeredCommands.push(cmdURIForCommentLine); // auto executable Function callback()
        this._registeredCommands.push(cmdHelloTwitch); // reference  callback
        this._registeredCommands.push(cmdCopyLineDown); // reference callback
        this._registeredCommands.push(cmdSuccess);
    }

    /**
     * Utility function to register and dispose commands
     * @param commandId The command Id defined in Commands Utils
     * @param callback The callback function to be executed when the command is called
     */
    private registerCommand(
        commandId: string,
        callback: (...args: any[]) => any,
        timeout: number
    ): void {
        let disposable: vscode.Disposable = vscode.commands.registerCommand(commandId, callback);

        if (timeout > 0) {
            setTimeout(() => {
                console.log(`Command ${commandId} disposed`);
                console.log(`Timeout: ${timeout}`);
                disposable.dispose();
            }, timeout);
        }
        this._context.subscriptions.push(disposable);
    }
}
