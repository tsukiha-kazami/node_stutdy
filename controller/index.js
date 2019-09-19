var fn_login =  async (ctx , next ) =>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
};

var fn_signin = async(ctx,next)=> {
    var name = ctx.request.body.name || '';
    var password = ctx.request.body.password || '' ;
    console.log(`signin with name: ${name} , password : ${password}`);
    if (name === 'lshi'&&password=== '123'){
        ctx.response.body =`<h1>welcome, ${name} !</h1>`
    }else{
        ctx.response.body= `<h1>Login failed!</h1>
        <p><a href="/login">Try again</a></p>`;
    }
};

var fn_index = async (ctx, next)=> {
    ctx.response.body = '<h1>index</h1>';
};



module.exports  =  {
    'get /login': fn_login,
    'post /signin': fn_signin,
    'get /':fn_index
}