
var fn_signin = async(ctx,next)=> {
    var email = ctx.request.body.email || '';
    var password = ctx.request.body.password || '' ;
    console.log(`signin with name: ${email} , password : ${password}`);
    if (email === 'lshi@qq.com'&& password=== '123'){
        //登陆成功
        ctx.render('signin-ok.html',{
           title:'Sign-in ok',
           name : 'Mr shi' 
        });
    }else{
        //登陆失败
        ctx.render('signin-fail.html',{
            title:'sign In failed'
        });
    }
};
module.exports = {
    'POST /signin': fn_signin
}
