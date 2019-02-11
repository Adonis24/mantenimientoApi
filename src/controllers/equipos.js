const oracleController = require('../services/oracleControllers');
const tableName ="EQU_EQUIPO";
const tableId ="EQU_CODIGO";

exports.get = async (req, res, next)=>{
    try {
        // let users = await getTest();
        let users = await oracleController.getList(tableName);
        res.send(users);
    } catch (error) {
        console.log(error);        
        res.status(500).send(error.message);
    }
}

exports.getById = async (req, res, next)=>{
    try {
        // let users = await getTest();
        if(!req.params.id){
            res.status(500).send('el id no se ha encontrado como parámetro');
        }
        let id = {};
        id.value = req.params.id    
        id.name = tableId
        let users = await oracleController.getById(tableName,id);
        res.send(users);
    } catch (error) {
        console.log(error);        
        res.status(500).send(error.message);
    }
}

exports.add = async (req, res, next)=>{
    try {
        let data = req.body;
        console.log({data});
        
        let users = await oracleController.add(tableName,data);
        res.send(users);
    } catch (error) {
        console.log(error);        
        res.status(500).send(error).message;
    }
}

exports.update = async (req, res, next)=>{
    try {
        // let users = await getTest();
        if(!req.params.id){
            res.status(500).send('el id no se ha encontrado como parámetro');
        }
        let id = {};
        id.value = req.params.id    
        id.name = tableId
        let data = req.body;
        let users = await oracleController.updateById(tableName,data,id);
        res.send(users);
    } catch (error) {
        console.log(error);        
        res.status(500).send(error.message);
    }
}

exports.delete = async (req, res, next)=>{
    let id = {};
    id.value = req.params.id    
    id.name = tableId;
    let users = await oracleController.deleteById(tableName,id);
    res.send(users);
    
}