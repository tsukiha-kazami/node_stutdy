// var fn_login =  async (ctx , next ) =>{
//     ctx.response.body = `<h1>Index</h1>
//     <form action="/signin" method="post">
//         <p>Name: <input name="name" value="koa"></p>
//         <p>Password: <input name="password" type="password"></p>
//         <p><input type="submit" value="Submit"></p>
//     </form>`;
// };


var fn_index = async (ctx, next)=> {
    ctx.render('index.html',{
        title:'Welcome'
    });
}



module.exports  =  {
    // 'get /login': fn_login,
    
    'GET /':fn_index
}