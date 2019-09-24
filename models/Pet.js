const db =require('../db');

module.exports =db.defineModel('pets',{
    ownId : db.ID,
    name : db.STRING(100),
    gender : db.BOOLEAN,
    birth: db.STRING(10)
})