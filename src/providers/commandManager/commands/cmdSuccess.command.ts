import * as vscode from "vscode";
import { Command } from "../../../entities/command.entity";
import { CommandId } from "../constant.commands";

export const cmdSuccess = new Command(CommandId.Success, success, false, 1000);
function success() {
    vscode.window.showInformationMessage("Success!");
}
