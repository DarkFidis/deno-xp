import { printf, sprintf } from "print";
import { red, yellow, gray, cyan } from "colors";
import { format } from "datetime"

type LogLevel = 0 | 1 | 2 | 3;

interface LoggerOptions {
    level: LogLevel;
    name?: string;
}

const initialOptions = { level: 0, name: "Deno-app" };

class Logger {
    private _level: LogLevel;
    private _name: string;
    constructor(options: LoggerOptions = initialOptions as LoggerOptions) {
        const { level, name } = { ...initialOptions, ...options };
        this._level = level;
        this._name = name;
    }
    get level(): LogLevel {
        return this._level;
    }
    get name(): string {
        return this._name;
    }

    private getLogDate(): string {
        const date = format(new Date(Date.now()), 'yyyy-MM-dd HH:mm:ss')
        return `[${date}]`
    }
    public info(message: any) {
        if (this.level > 0) return;
        const format = `${this.getLogDate()} [${gray('INFO')}] [${this.name}] - %s\n`
        printf(sprintf(format, message.toString()));
    }
    public debug(message: any) {
        if (this.level > 1) return;
        const format = `${this.getLogDate()} [${cyan('DEBUG')}] [${this.name}] - %s\n`
        printf(sprintf(format, message.toString()));
    }
    public warn(message: any) {
        if (this.level > 2) return;
        const format = `${this.getLogDate()} [${yellow('WARN')}] [${this.name}] - %s\n`
        printf(sprintf(format, message.toString()));
    }
    public error(message: any) {
        const format = `${this.getLogDate()} [${red('ERROR')}] [${this.name}] - %s\n`
        printf(sprintf(format, message.toString()));
    }
}

export { Logger };