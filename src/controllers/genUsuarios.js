const oracleController = require('../services/oracleControllers');
const tableName ="GEN_USU_USUARIO";
const tableId ="GEN_USU_ID";

exports.get = async (req, res, next)=>{
    try {
        // let users = await getTest();
        let users = await oracleController.getList(tableName,req.query);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.getById = async (req, res, next)=>{
    try {
        // let users = await getTest();
        if(!req.params.id){
            res.status(500).send({error:'el id no se ha encontrado como parámetro'});
        }
        let id = {};
        id.value = req.params.id    
        id.name = tableId
        let users = await oracleController.getById(tableName,id);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.add = async (req, res, next)=>{
    try {
        let data = req.body;
        
        data[tableId] = await oracleController.idAutoIncrement(tableName,tableId);
        console.log({data});
        let users = await oracleController.add(tableName,data);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.update = async (req, res, next)=>{
    try {
        // let users = await getTest();
        // if(!req.params.id){
        //     res.status(500).send({error:'el id no se ha encontrado como parámetro'});
        // }
        let id = {};
        id.value = req.body[tableId]; 
        id.name = tableId;
        let data = req.body;
        let users = await oracleController.updateById(tableName,data,id);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}

exports.delete = async (req, res, next)=>{
    let id = {};
    id.value = req.params.id    
    id.name = tableId;
    let users = await oracleController.deleteById(tableName,id);
    res.send(users);
    
}