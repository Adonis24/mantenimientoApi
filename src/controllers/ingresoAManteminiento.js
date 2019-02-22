const oracleController = require('../services/oracleControllers');
const tableName ="MXE_MANT_X_EQUIPO";
const tableId ="MXE_ID_TABLA";

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

exports.getWithRelatedData = async (req, res, next)=>{
    try {
        // let users = await getTest();
        let sql ="SELECT MXE_MANT_X_EQUIPO.MXE_ID_TABLA FROM MXE_MANT_X_EQUIPO";
        // let data1 =[
        //     {
        //         tableName:'MXE_MANT_X_EQUIPO',
        //         attributes:[
        //             {
        //                 name:'MXE_FECHA',                        
        //             },
        //             {
        //                 name:'MXE_CODIGO_EQUIPO',
        //                 fk:{
        //                     tebleName:'EQU_EQUIPO',
        //                     reference:'EQU_CODIGO',
        //                     atributeName:'EQU_NOMBRE',
        //                     as:'Equipo'
        //                 }
        //             },
        //             {
        //                 name:'MXE_FECHA'
        //             },
        //             {
        //                 name:'MXE_LECTURA_HOROMETRO'
        //             }
        //         ]
        //     }
        // ];
    
        let users = await oracleController.getgetWithRelatedData(sql,["MXE_MANT_X_EQUIPO","EQU_EQUIPO"]);
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