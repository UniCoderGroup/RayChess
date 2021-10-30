import Koa from 'koa'
import mysql from 'mysql'
import chalk from 'chalk'
import qs from 'querystring';


const log = console.log;
class LogSymbols  {
    info = chalk.blue('\u2139');
    success = chalk.green('\u2714');
    warning = chalk.yellow('\u26A0');
    error = chalk.red('\u2716');
};
const logSymbols = new LogSymbols;
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
const fieldApp = new LogField(chalk.blueBright, "App");
const fieldSql = new LogField(chalk.blue, "SQL");
const fieldTest = new LogField(chalk.yellow, "Test");
const fieldServer = new LogField(chalk.rgb(45, 175, 190), "Server");
const logStarting = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.info, chalk.green(...text));
}
const logOK = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.success, chalk.greenBright(...text));
}
const logError = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.error, chalk.red(...text));
}
const logEvent = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.info, chalk.rgb(245, 245, 245)(...text));
}
const logClose = (field: LogField, ...text: unknown[]) => {
    log(field.str, logSymbols.warning, chalk.rgb(255, 204, 0)(...text));
}

logStarting(fieldApp, "Starting...");

logStarting(fieldSql, "Connecting...");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xy323000',
    database: 'raychess_test'
});
connection.connect({}, (err, args) => {
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
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    logEvent(fieldServer,
        chalk`{rgb(134,165,85) {bgRgb(245,245,245) ${ctx.method}}}{rgb(90,90,90) {bgRgb(252,252,252)  ${ctx.url}}}`,
        chalk`- {yellow ${rt}}`);
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
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
        default:
            throw new Error();
    }
});

// error
app.on('error', (err, ctx) => {
    logError(fieldServer, 'Server error:', err, 'context:', ctx)
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

let gdata = new Object;
function getMain(ctx: Koa.Context) {
    if (ctx.request.path === '/') {
        ctx.set('Content-Type', 'text/html');
        ctx.body =`<html>
<head>
</head>
<body>
<p>
Hello World. url = ${ctx.request.url}. db-name = ${ctx.sql.config.database}
</p>
<img src="favicon.ico"/>
</body>
</html>`;
    } else if (ctx.request.path === '/favicon.ico') {
        //let img = connection.query('SELECT img FROM user_img_tbl WHERE user_id=1;');

        //setTimeout(() => { log(img);}, 5000);
        
        //ctx.set('Content-Type', 'image/jpeg');
        //ctx.body = img.values[0];
    } else if (ctx.request.path === '/value') {
        ctx.body = gdata[ctx.request.query.name as string];
    }
}

function postMain(ctx: Koa.Context, postData: unknown) {
    if (ctx.request.path === '/value') {
        const data = qs.parse(postData as string);
        gdata[data.name as string] = data.value;
        ctx.body = `seted: (${ctx.request.url}) ${data.name}=${data.value}`;
    } else if (ctx.request.path === '/close') {
        ctx.body = 'server closed in 2s!'
        setTimeout(exit, 2000);
    }
}