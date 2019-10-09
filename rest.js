module.exports = {
    ApiError: function(code,message){
        this.code = code || 'internal:unknown_error';
        this.message  = message || '';
    },
    restify: (pathPrefix) =>{
        //rest api 前缀默认api/
        pathPrefix =pathPrefix||'/api/';
        return async (ctx,next)=>{
            //是否是rest api 前缀
            if(ctx.request.path.startsWith(pathPrefix)){
                ctx.rest = (data)=>{
                    ctx.response.type = 'application/json';
                    ctx.response.body =data;
                }
                try{
                    await next();
                }catch(e){
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body= {
                        code :e.code || 'internal:unknow_error',
                        message: e.message || ''
                    };
                }
            }else{
                await next();
            }
        };
    }
};