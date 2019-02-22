

const oracleController = require('../services/oracleControllers');
const tableName ="USU_USUARIO";
const tableId ="USU_ID_TABLA";

exports.get = async (req, res, next)=>{
    try {
        // let users = await getTest();
        let users = await oracleController.getList(tableName,req.query);
        res.send(users);
    } catch (error) {
        console.log(error);        
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
        // if(!req.params.id){
        //     res.status(400).send({error:'el id no se ha encontrado como parámetro'});
        // }
        let id = {};
        id.value = req.body[tableId];
        id.name = tableId
        let data = req.body;
        console.log({data});        
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

exports.prueba = async (req, res, next)=>{
    let sql = 
`select decode( 
t.table_name
, lag(t.table_name, 1) over(order by t.table_name)
, null
, t.table_name ) as table_name 
, t.column_name                         
, t.data_type
, t.NULLABLE
, cc.constraint_name
, uc.constraint_type
from user_tab_columns t
  left join user_cons_columns cc
    on (cc.table_name = t.table_name and
        cc.column_name = t.column_name)
  left join user_constraints uc
    on (t.table_name = uc.table_name and
        uc.constraint_name = cc.constraint_name )
where t.table_name in ('USUARIOS')`

        try {
            let users = await oracleController.executeSqlAndExtractJSON(sql);
            res.send(users);
        } catch (error) {
            console.log(error);        
            res.status(500).send({error:error.message});
        }
}

exports.prueba2 = async (req, res, next)=>{
   
        try {
            let date1 = new Date().toLocaleString()
            let date2 = require('moment')(new Date().getTime()).utc().unix()
            let date3 = require('moment').utc(new Date().getTime()).format('DD-MMM-YYYY hh:mm:ss');
            
            res.send({date1,date2,date3});
        } catch (error) {
            console.log(error);        
            res.status(500).send({error:error.message});
        }
}

