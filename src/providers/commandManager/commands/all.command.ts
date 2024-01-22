import { CommandId } from "../constant.commands";
import { Command } from "../../../entities/command.entity";

import * as vscode from "vscode";

/* Add new commands here */

// Add comment line
export const cmdAddCommentLine = new Command(CommandId.AddCommentLine, addCommentLine);
function addCommentLine() {
    vscode.commands.executeCommand("editor.action.addCommentLine");
}

// Get editor definition
export const cmdGetEditorDefinition = new Command(
    CommandId.GetEditorDefinition,
    getEditorDefinition
);
async function getEditorDefinition() {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
        "vscode.executeDefinitionProvider",
        activeEditor.document.uri,
        activeEditor.selection.active
    );

    for (const definition of definitions) {
        console.log(definition);
    }
}

// Commands URI (auto executable Function)
export const cmdURIForCommentLine = new Command(
    CommandId.URIForCommentLine,
    URIForCommentLine,
    true
);
function URIForCommentLine(): vscode.Disposable {
    return vscode.languages.registerHoverProvider(
        "csharp",
        new (class implements vscode.HoverProvider {
            provideHover(
                _document: vscode.TextDocument,
                _position: vscode.Position,
                _token: vscode.CancellationToken
            ): vscode.ProviderResult<vscode.Hover> {
                const args = [{ uri: _document.uri }];
                const stageCommandUri = vscode.Uri.parse(
                    `command:git.stage?${encodeURIComponent(JSON.stringify(args))}`
                );

                const contents = new vscode.MarkdownString(`[Stage File](${stageCommandUri})`);

                //const commentCommandUri = vscode.Uri.parse(`command:editor.action.addCommentLine`);
                /* const contents = new vscode.MarkdownString(
                    `[Add Comment Line](${commentCommandUri})`
                ); */

                contents.isTrusted = true;

                return new vscode.Hover(contents);
            }
        })()
    );
}

// Hello Twitch (via Reference)
export const cmdHelloTwitch = new Command(CommandId.HelloTwitch, helloTwitch, true);
function helloTwitch() {
    vscode.window.showInformationMessage("Hello Twitch!");
}

// Copy line down
export const cmdCopyLineDown = new Command(CommandId.CopyLineDown, copyLineDown);
function copyLineDown() {
    vscode.commands.executeCommand("editor.action.copyLinesDownAction");
}
