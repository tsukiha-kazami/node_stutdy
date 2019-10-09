const path  = require('path')
const mime = require('mime');
const fs = require('mz/fs');


// url: 类似 '/static/'
// dir: 类似 __dirname + '/static'
function staticFiles (url , dir){
    return async(ctx , next) =>{
        let rpath = ctx.request.path;
        if (rpath.startsWith(url)){
            //获取文件的完整路径
            let fp = path.join(dir ,rpath.substring(url.length));
            //判断文件是否存在
            if(await fs.exists(fp)){
                //查找文件的mime
                ctx.response.type =mime.lookup(rpath);
                //读取文件内容并且赋值给response.body
                ctx.response.body= await fs.readFile(fp);
            }else{
                ctx.response.status = 404;
            }

        }else{
            //不是指定前缀的url
            await next();
        }
    };
}
module.exports =staticFiles;