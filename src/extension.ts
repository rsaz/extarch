import * as vscode from "vscode";
import { CommandManager } from "./providers/commandManager/commandManager.provider";

export function activate(context: vscode.ExtensionContext) {
    const manager = new CommandManager(context);
    manager.initCommands();
}

export function deactivate() {}
