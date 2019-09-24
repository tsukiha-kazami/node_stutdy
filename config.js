const defaultConfig  = './config-default.js';
const testConfig = './config-test.js';

const fs =  require('fs');

var config = null;

if(process.env.NODE_ENV=== 'test'){
    console.log(`load ${testconfig}`);
    config= require(testConfig);
}else{
    console.log(`load ${defaultConfig}`);
    config =require(defaultConfig);

    // try{
    //     if(fs.statSync(overrideConfig).isFile()){
    //         console.log(`load  ${overrideConfig}`);
    //         config =Object.assign(config,require(overrideConfig));
    //     }
    // }catch(err){
    //     console.log(`cannot load overrideConfig`);
    // }
}

module.exports = config;