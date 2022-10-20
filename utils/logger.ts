import Log4js from "log4js";

const logLevel = process.env.LogLevel || 'debug';

Log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%d %p %f:%l %x{msg}%n',
                tokens: {
                    msg: (logEvent: any) => {
                        return (logEvent.data || '').toString().replace(/\n/g, '\r');
                    }
                }
            }
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: logLevel,
            enableCallStack: true
        }
    }
});

export const log = Log4js.getLogger();
