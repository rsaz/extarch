export class Command {
    private _commandId: string;
    private _callback: (...args: any[]) => any | Function;
    private _isAutoCallable: boolean;
    private _timeout: number;

    constructor(
        commandId: string,
        callback: (...args: any[]) => any | Function,
        isAutoCallable: boolean = false,
        timeout: number = 0
    ) {
        this._commandId = commandId;
        this._callback = callback;
        this._isAutoCallable = isAutoCallable;
        this._timeout = timeout;
    }

    public get CommandId(): string {
        return this._commandId;
    }

    public get CommandFn(): (...args: any[]) => any | Function {
        return this._callback;
    }

    public get IsAutoCallable(): boolean {
        return this._isAutoCallable;
    }

    public get Timeout(): number {
        return this._timeout;
    }
}
