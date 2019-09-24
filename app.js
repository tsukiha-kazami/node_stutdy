// 创建一个Koa对象表示web app本身:
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const app = new Koa();

const bodyParse = require("koa-bodyparser");
const controller =require('./controller');

const staticFiles =require('./static-files');
const templating  = require('./templating');

const config =require('./config');
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


// var Pet= sequelize.define('pet',{
//     id :{
//         type : Sequelize.STRING(50),
//         primaryKey : true 
//     },
//     name  : Sequelize.STRING(100),
//     gender : Sequelize.BOOLEAN,
//     birth: Sequelize.STRING(10),
//     createdAt: Sequelize.BIGINT,
//     updatedAt: Sequelize.BIGINT,
//     version: Sequelize.BIGINT
// },{
//     timestamps:false
// });

var now = Date.now();

(async () =>{
    var dog =await Pet.create({
        id:'d-'+now ,
        name : 'gaffey',
        gender :false,
        birth: '2000-01-01',
        createdAt:now ,
        updatedAt:now,
        version:0
    });
    console.log('created: '+JSON.stringify(dog));
})();


(async () =>{
    var pets =await Pet.findAll({
        where:{
            name : 'gaffy'
        }
    });
    console.log(`find pet ${pets.length} pets`);
    for (let p of pets){
        console.log(JSON.stringify(p));
    }
})();




