// 创建一个Koa对象表示web app本身:
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const app = new Koa();

const bodyParse = require("koa-bodyparser");
const controller =require('./controller');

const staticFiles =require('./static-files');
const templating  = require('./templating');
const isProduction = process.env.NODE_ENV === 'production';

// if(!isProduction){
//     let staticFiles =require('./static-files');
// }

//first： log request URL:
app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}`);
    var
    start = new Date().getTime(),
    execTime ;
    await next();
    execTime = new Date().getTime() - start ;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
});
//second： handle static dir
app.use(staticFiles('/static/',__dirname+ '/static'));

//third：handle post body
app.use(bodyParse());

//forth：use nunjucks
app.use(templating('views',{
    noCache:!isProduction,
    watch: !isProduction
}))

//fifth handle router url 
app.use(controller());


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
