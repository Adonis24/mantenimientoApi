const oracleController = require('../services/oracleControllers');
const tableName ="GEN_CSA_COMPANIA_SEDE_AREA";
const tableId ="GEN_CSA_ID";

exports.get = async (req, res, next)=>{
    try {
        // let users = await getTest();
        let users = await oracleController.getList(tableName,req.query);
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
            res.status(500).send({error:'el id no se ha encontrado como parámetro'});
        }
        let id = {};
        id.value = req.params.id    
        id.name = tableId
        let users = await oracleController.getById(tableName,id);
        res.send(users);
    } catch (error) {
        console.log(error);        
        res.status(500).send({error:error.message});
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
        res.status(500).send({error:error.message});
    }
}

exports.update = async (req, res, next)=>{
    try {
        // let users = await getTest();
        if(!req.params.id){
            res.status(500).send({error:'el id no se ha encontrado como parámetro'});
        }
        let id = {};
        id.value = req.body.id    
        id.name = tableId
        let data = req.body;
        let users = await oracleController.updateById(tableName,data,id);
        res.send(users);
    } catch (error) {
        console.log(error);        
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
exports.getByActive = async (req, res, next)=>{
    try {
        // let users = await getTest();
        let sql = `SELECT GEN_EST_ID,GEN_EST_TAB_ID, GEN_EST_NOMBRE 
        FROM AEROSAN.GEN_EST_ESTADO
        INNER JOIN AEROSAN.GEN_TAB_TABLAS ON (GEN_TAB_ID = GEN_EST_TAB_ID AND GEN_TAB_ID_NOMBRE_REFERENCIA ='${tableName}' )
        WHERE GEN_EST_REG_ACTIVO = 1
        ORDER BY GEN_EST_NOMBRE`;
        let users = await oracleController.getConsult(sql);
        res.send(users);
    } catch (error) {
        console.log({error:error});        
        res.status(500).send({error:error.message});
    }
}