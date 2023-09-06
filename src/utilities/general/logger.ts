import jsLogger from 'js-logger';

export enum LogType {
    DEBUG,
    INFO,
    WARN,
    ERROR
}

export enum FunctionType {
    UI = "UI",
    API = "API",
    OTHER = "OTHER",
    NONE = "NONE",
    TESTCASE = "TESTCASE"
}

export class Logger {

    /**
     * Write log to console with Logging level
     * @static
     * @param {(string | FunctionType)} messageType message type (API, UI. TESTCASE or OTHER)
     * @param {string} info string which will be written in the console
     * @param {LogType} [debugType=LogType.INFO] log type (DEBUG, INFO, WARN or ERROR)
     * @returns {Promise<void>} Log message
     * @memberof Logger
     */
    static write(messageType: string | FunctionType, info: string, debugType: LogType = LogType.INFO): Promise<void> {
        return new Promise((resolve) => {
            let text = "";
            let i: number = 1;
            let bString: string = "=";
            let textLen = info.length;

            if (textLen > 131) {
                textLen = 131;
            }

            if (messageType != FunctionType.NONE) {
                if (messageType.toString() == FunctionType.TESTCASE.toString()) {
                    for (i; i < textLen; i++) {
                        bString = bString + "=";
                    }
                    text = `\n${bString}\n${info}\n${bString}\n`;
                } else {
                    text = `${messageType} >>>>> ${info}`;
                }
            } else {
                text = `${info}`;
            }

            switch (debugType) {
                case LogType.DEBUG:
                    resolve(jsLogger.debug(text));
                    break;
                case LogType.INFO:
                    resolve(jsLogger.info(text));
                    break;
                case LogType.WARN:
                    resolve(jsLogger.warn(text));
                    break;
                case LogType.ERROR:
                    resolve(jsLogger.error(text));
                    break;
            }
        })
    }

}