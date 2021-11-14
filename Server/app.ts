import Koa from 'koa'
import mysql from 'mysql'
import chalk from 'chalk'
import qs from 'querystring'
import { isString } from 'util';


const log = console.log;
const logSymbols = {
    info: chalk.blue('\u2139'),
    success: chalk.green('\u2714'),
    warning: chalk.yellow('\u26A0'),
    error: chalk.red('\u2716')
};
const logTableChar = {
    LT: '\u250C',
    L: '\u2502',
    LB: '\u2514'
};
class LogField {
    constructor(chalk: chalk.Chalk, name: string) {
        this.chalk = chalk;
        this.name = name;
    }
    chalk: chalk.Chalk;
    name: string;
    get str() {
        let n = 6 - this.name.length;
        return "[" + chalk.rgb(0, 122, 204).italic("RayChess") + "][" + this.chalk(this.name) + "]" + " ".repeat(n);
    }
}
let logStack: string[] = [];
function getStack(): string {
    let stack = "";
    for (let str of logStack) {
        stack += str;
    }
    return stack;
}
const fieldApp = new LogField(chalk.blueBright, "App");
const fieldSql = new LogField(chalk.blue, "SQL");
const fieldTest = new LogField(chalk.yellow, "Test");
const fieldServer = new LogField(chalk.rgb(45, 175, 190), "Server");
const logStarting = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.info, getStack(), chalk.green(...text));
}
const logOK = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.success, getStack(), chalk.greenBright(...text));
}
const logError = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.error, getStack(), chalk.bgYellow.red("ERR!"), chalk.redBright(...text));
}
const logEvent = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.info, getStack(), chalk.rgb(245, 245, 245)(...text));
}
const logClose = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.warning, getStack(), chalk.rgb(255, 204, 0)(...text));
}

logStarting(fieldApp, "Starting...");

logStarting(fieldSql, "Connecting...");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xy323000',
    database: 'raychess_test'
});
connection.connect({}, (err) => {
    if (err !== null) logError(fieldSql, "Connect error:", err);
});

logOK(fieldSql, "Connected.");

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) {
        logError(fieldTest, "MySQL test error:", error.message);
    }
    logOK(fieldTest, 'The solution is: ', chalk.yellow(results[0].solution));
});

const app = new Koa<Koa.DefaultState, {
    sql: mysql.Connection
}>();

app.context.sql = connection;


// logger
let nReq = 0;
app.use(async (ctx, next) => {
    nReq++;
    logEvent(fieldServer, chalk`{rgb(45,175,190) ${logTableChar.LT}Req#${nReq}} START`,
        chalk`{rgb(134,165,85) {bgRgb(220,220,220) ${ctx.method}${" ".repeat(7 - ctx.method.length)}}}{rgb(90,90,90) {bgRgb(252,252,252) ${ctx.url}}}`)
    logStack.push(chalk` {rgb(45,175,190) ${logTableChar.L}}`);
    await next();
    const rt = ctx.response.get('X-Response-Time');
    logStack.pop();
    logEvent(fieldServer, chalk`{rgb(45,175,190) ${logTableChar.LB}Req#${nReq}} END - {yellow ${rt}}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// Allow CORS
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    ctx.set('Access-Control-Allow-Credentials', "true");
    await next();
});

// response
app.use(async ctx => {
    switch (ctx.method) {
        case "GET":
            getMain(ctx);
            break;
        case "POST":
            function paresPostData(ctx) {
                return new Promise((resolve, reject) => {
                    try {
                        let postData = ''
                        ctx.req.addListener('data', (data) => {
                            postData += data
                        })
                        ctx.req.on('end', () => {
                            resolve(postData)
                        })
                    } catch (err) {
                        reject(err)
                    }
                })
            }
            let postData = await paresPostData(ctx);
            postMain(ctx, postData);
            break;
        case "OPTIONS":
            ctx.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
            ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
            ctx.set('Access-Control-Max-Age', '1728000');
            ctx.body = "";
            break;
        default:
            throw new Error();
    }
});

// error
app.on('error', (err, ctx) => {
    logStack = [];
    logError(fieldServer, 'Server error:', (err as Error).name, (err as Error).message, 'stack:', (err as Error).stack);
    log(ctx);
});

logStarting(fieldApp, chalk`Start listening on {whiteBright {underline http://localhost:1234}}.`);
let server = app.listen(1234);

function exit() {
    server.close();
    logClose(fieldServer, "Closed.");
    connection.destroy();
    logClose(fieldSql, "Connection closed.");
    logClose(fieldApp, "Closed.");
}

// example: "/1234/foo/bar" -> "1234"
function solveRoomId(path: string): string {
    path = path.substring(1);
    let roomId = "";
    for (let c of path) {
        if (c === '/') break;
        else roomId += c;
    }
    logEvent(fieldServer, chalk`RoomId solved: {rgb(0,122,204) #${roomId}}`);
    return roomId;
}

let gdata = new Object;
function getMain(ctx: Koa.Context) {
    let path = ctx.request.path;
    if (path === '/') {
        ctx.set('Content-Type', 'text/html');
        ctx.body = `<html>
<head>
</head>
<body>
<p>
Hello World. url = ${ctx.request.url}. db-name = ${ctx.sql.config.database}
</p>
<img src="favicon.ico"/>
</body>
</html>`;
    } else if (path === '/favicon.ico') {
        //let img = connection.query('SELECT img FROM user_img_tbl WHERE user_id=1;');

        //setTimeout(() => { log(img);}, 5000);

        //ctx.set('Content-Type', 'image/jpeg');
        //ctx.body = img.values[0];
    } else if (path === '/value') {
        ctx.body = gdata[ctx.request.query.name as string];
    } else if (path.startsWith('/room')) {
        path = path.substring('/room'.length);
        let roomId = solveRoomId(path);
        logEvent(fieldServer, chalk`{rgb(0,122,204) ${logTableChar.LT}Room#${roomId}} START`);
        logStack.push(chalk`{rgb(0,122,204)  ${logTableChar.L}}`);
        path = path.substring(roomId.length + 1);
        if (path.startsWith('/chat')) {
            path = path.substring('/chat'.length);
            if (path.startsWith('/all')) {
                if (!roomData.has(roomId)) {
                    roomData.set(roomId, {
                        chatMessages: []
                    });
                    logEvent(fieldServer, `Generate data for Room#${roomId}.`);
                }
                ctx.body = roomData.get(roomId).chatMessages;
                logEvent(fieldServer, `Get chat messages.`);
            }
        }
        logStack.pop();
        logEvent(fieldServer, chalk`{rgb(0,122,204) ${logTableChar.LB}Room#${roomId}} END`);
    }
}

interface Room {
    chatMessages: {
        from: string,
        content: string
    }[]
}
let roomData = new Map<string, Room>();

function postMain(ctx: Koa.Context, postData: unknown) {
    let path = ctx.request.path;
    if (path === '/value') {
        const data = qs.parse(postData as string);
        gdata[data.name as string] = data.value;
        ctx.body = `seted: (${ctx.request.url}) ${data.name}=${data.value}`;
    } else if (path === '/close') {
        ctx.body = 'server will be closed in 2s!'
        setTimeout(exit, 2000);
    } else if (path.startsWith('/room')) {
        path = path.substring('/room'.length);
        let roomId = solveRoomId(path);
        logEvent(fieldServer, chalk`{rgb(0,122,204) ${logTableChar.LT}Room#${roomId}} START`);
        logStack.push(chalk`{rgb(0,122,204)  ${logTableChar.L}}`);
        path = path.substring(roomId.length + 1);
        if (path.startsWith('/chat')) {
            path = path.substring('/chat'.length);
            if (path.startsWith('/add')) {
                if (!roomData.has(roomId)) {
                    logError(fieldServer, `No data for room#${roomId}.`);
                    ctx.status = 404;
                    ctx.body = "No data.";
                } else {
                    let data = JSON.parse(postData as string);
                    roomData.get(roomId).chatMessages.push({
                        from: "unknown",
                        content: data["content"]
                    });
                    let maxContent = 30;
                    let displayContent = data["content"].length > maxContent ? data["content"].substring(0, maxContent - 3) + chalk.white("...") : data["content"];
                    logEvent(fieldServer, chalk`Add chat message: {bgGray \"${displayContent}\"}.`);
                    ctx.body = "Received.";
                }
            }
        }
        logStack.pop();
        logEvent(fieldServer, chalk`{rgb(0,122,204) ${logTableChar.LB}Room#${roomId}} END`);
    }
}