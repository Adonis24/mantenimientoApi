var moment = require('moment');

let connection;

require('../services/connection').conectar().then(connectionResp=>{
    connection =connectionResp;
    console.log('database conected');
    
});
/**
 * transforma un string con la primera letra en mayuscula
 * @param {string} string nombre a capitalzar
 */
let  capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * extrae los encabezados de una tabla
 * y los pone en el formato que exige material desing y bootstrap_vue
 * @param {Array} rows datos de la base de datos
 */
let getColumns =(rows)=>{
    let columns = [];
    if(Array.isArray(rows)){
        if(typeof rows[0] === 'object'){
            for (const key in rows[0]) {
                let column ={};
                column.label = capitalizeFirstLetter(key.toLowerCase());
                column.field = key.toLowerCase();
                column.key = key;
                columns.push(column);
            }
        }      
    }else if(typeof rows === 'object'){
        for (const key in rows) {
            let column ={};
            column.label = capitalizeFirstLetter(key);
            column.field = key.toLowerCase();
            columns.push(column);
        }
    }
    return columns; 
}

/**
 * la idea es que esta funcion extraiga todos las 
 * columnas y y el tipo de dato de cada columna de una consulta
 * @param {string} tablename nombre de la tabla
 * @param {*} columnsOfConsult 
 */
let getColumnsAndMetadata =async (tablename,columnsOfConsult)=>{
    let select =
    `SELECT 
        user_tab_columns.table_name,user_tab_columns.DATA_TYPE,user_tab_columns.COLUMN_NAME,user_tab_columns.NULLABLE
    FROM 
        user_tab_columns
    where 
        user_tab_columns.table_name = '${tablename}'`
   

    let columnsAndMetadata = await executeSql(select);  
    let columnsResp = await catchConsultToJSON(columnsAndMetadata);
    let columns = [];
    console.log(columnsResp)
    for (let i = 0; i < columnsResp.length; i++) {
        const element = columnsResp[i];    
        let column ={};
        column.label = capitalizeFirstLetter(element.COLUMN_NAME.toLowerCase());
        column.field = element.COLUMN_NAME.toLowerCase();
        column.key = element.COLUMN_NAME;
        column.type = element.DATA_TYPE;
        column.nullable = element.NULLABLE;
        columns.push(column);        
    }
    

    return columns;
        `(user_tab_columns.table_name = 'USUARIOS' and COLUMN_NAME = 'USUARIO_MODIFICACION')
    OR 
        (user_tab_columns.table_name = 'USUARIOS' and COLUMN_NAME = 'USUARIO_INSERCION')`
}
/**
 * extrae todos los datos de una tabla y los envía en formato JSON
 * @param {string} tablename nombre de la tabla
 * @returns {data,count} data = JSON (datos) , count = int contidad de registros
 */
exports.getList = async (tablename) =>{
    try {
        let sql = generateSql(tablename);
        let result = await executeSql(sql.sqlList);  
        let [rows,count] = await Promise.all([catchConsultToJSON(result),countSql(sql.sqlCount)]);
        let columns = await getColumnsAndMetadata(tablename);
        // let resultJSON = catchConsultToJSON(result);
       
        return ({columns,rows,count});
    } catch (error) {
        throw error
    }
}
/**
 * ejecuta una consulta y la convierte en formato JSON
 * @param {string} sql sql de la consult
 */
exports.getListJSON = async (sql) =>{
    try {

        let result = await executeSql(sql);    
        let resultJSON = catchConsultToJSON(result);

        return (resultJSON);
    } catch (error) {
        throw error
    }
}

/**
 * convierte una consulta que llega como una matriz, proveniente de oracle
 * y la transforma en un json de tipo clave valor
 * @param {JSON} consult consulta  proveniente de oracle
 */
let catchConsultToJSON = async (consult) =>{
 
    let resultJSON =[];
    for (let i = 0; i < consult.rows.length; i++) {
        resultJSON.push({});
        for (let j = 0; j < consult.rows[i].length; j++) {
            // console.log({metadata:result.metaData[j].name} ,{j});
            // console.log({rows:result.rows[i][j]},{i},{j});                        
            resultJSON[i][consult.metaData[j].name] = consult.rows[i][j];    
        }
    }
    return resultJSON;
}
/**
 * extrae la cantidad de registros de una cosulta 
 * @param {strgin} sql ejemplo `SELECT COUNT(*) FROM tableName
 * @returns {int} dato de los regustros contados 
 */
let countSql = async (sql)=>{
    let count = await executeSql(sql);
    return count.rows[0][0];
}
/**
 * ejecuta una consulta o una petición sql que se desee
 * @param {string} sql string sql a ejecutar
 */
let executeSql =(sql)=>{
    return new Promise((resolve,reject)=>{
        connection.execute(sql,
            function(err, result) {
              if (err) {
                console.error(err.message);
                reject(err.message)
                //doRelease(connection);
                return;
              }
            //   console.log(JSON.stringify(result, null, "\t"));
                            
              resolve(result);
              //doRelease(connection);
            });
    });
}
exports.executeSql = executeSql;
/**
 * ejecuta cualquier sql y lo transforma en un JSON
 * @param {string} sql consulta sql
 */
let executeSqlAndExtractJSON = async (sql)=>{
    let result = await executeSql(sql);
    return catchConsultToJSON(result);
}
exports.executeSqlAndExtractJSON = executeSqlAndExtractJSON;
/**
 * - genera las cosuntas necesarias que se necesitan para traer los datos de las listas y count
 * @param {string} tableName nombre de la tabla de la base de datos
 * @returns {JSON} {sqlList,sqlCount}, sqlList = select * from .. , sqlCount = select count(*) ..
 */
let generateSql =(tableName)=>{
    let sqlList = `SELECT * FROM ${tableName}`;
    let sqlCount =  `SELECT COUNT(*) FROM ${tableName}`;
    return {sqlList,sqlCount};
}

/**
 * - genera las cosuntas necesarias que se necesitan para traer los datos de las listas y count
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} id {name:'id',value:'1'} name = nombre de el campo , value = valor del campo de ese id
 * @returns {JSON} {sqlList,sqlCount}, sqlList = select * from ..where id  = 1 , sqlCount = select count(*) ..where id  = 1
 */
let generateSqlById =(tableName,id)=>{
    
    let sqlList = `SELECT * FROM ${tableName} WHERE ${id.name} = ${id.value}`;
    let sqlCount =  `SELECT COUNT(*) FROM ${tableName}  WHERE ${id.name} = ${id.value}`;
    return {sqlList,sqlCount};
}
/**
 * convierte todas las fechas provenientes de la base de datos
 * en una fecha en UnixTime en millisegundos
 * @param {JSON} data datos de la base de datos oracle
 */
let catchDateToUnixTime =async(data)=>{
    let metaData = await getMetadataOfTable(tableName);
    // transofmar las fechas 
}

/**
 * extraer un dato de una tabla por id
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} id {name:'id',value:'1'} name = nombre de el campo , value = valor del campo de ese id
 */
exports.getById = async (tableName,id) =>{
    try {
        let sql = generateSqlById(tableName,id);       
        let result = await executeSql(sql.sqlList);  
        let [rows,count] = await Promise.all([catchConsultToJSON(result),countSql(sql.sqlCount)]);
        let columns = getColumns(rows);
        // data = await catchDateToUnixTime(data);
        return ({rows,columns,count});
    } catch (error) {
        throw error
    }
}
let catchType = (DATA_TYPE)=>{    
    if(DATA_TYPE.toUpperCase() === "VARCHAR2"){
        return 'string'
    }else if(DATA_TYPE.toUpperCase() === "NUMBER"){
        return 'number'
    }else if(DATA_TYPE.toUpperCase() === "DATE"){
        return 'number'
    }else if(DATA_TYPE.toUpperCase() === "BOOLEAN"){
        return 'boolean'
    }else if(DATA_TYPE.toUpperCase() === "CLOB"){
        return 'string'
    }else{
        return -1
    }
}
let validateDateInsert = async (tableName,data)=>{
    let keys = [];
    let values = [];
    let metaData = await getMetadataOfTable(tableName);
   
    
    for (const key in data) {
        let tableAttribute = metaData.filter(resp => resp.COLUMN_NAME === key);
        
        
        // verificar si 
        if(tableAttribute.length > 0){
            tableAttribute = tableAttribute[0];
            console.log({tableAttribute:tableAttribute.DATA_TYPE});            
            if(typeof data[key] === catchType(tableAttribute.DATA_TYPE)){
                if(tableAttribute.DATA_TYPE.toUpperCase() === "VARCHAR2"){
                    values.push(`'`+data[key]+`'`);
                }else if(tableAttribute.DATA_TYPE.toUpperCase() === "NUMBER"){
                    values.push(data[key]);
                }else if(tableAttribute.DATA_TYPE.toUpperCase() === "DATE"){
                    // values.push('DATE '+ moment.unix(data[key])).utc();
                    values.push(`TO_DATE('` +new Date(data[key]).toLocaleString()+`', 'YYYY-MM-DD HH24:MI:SS')`); 
                }else if(tableAttribute.DATA_TYPE.toUpperCase() === "BOOLEAN"){
                    values.push(data[key]);
                }else if(tableAttribute.DATA_TYPE.toUpperCase() === "CLOB"){
                    values.push(`'`+data[key]+`'`);
                }else{
                    throw `el tipo de dato: ${tableAttribute.DATA_TYPE.toUpperCase()} no está definido en el servicio1`
                }
            }else{
                // si el dato es null verificar si se puede enviar null
                
                if(data[key] === null){
                    if(tableAttribute.NULLABLE.toUpperCase() === 'Y'){
                        values.push(`'`+data[key]+`'`);
                    }else{
                        throw `el valor ${data[key]} no es de tipo ${catchType(tableAttribute.DATA_TYPE)}`
                    }
                }else{
                    throw `el dato: ${key}:${data[key]} ano es tipo  ${tableAttribute.DATA_TYPE.toUpperCase()}`
                }
            }            
            keys.push(key);
            
        }else{
            // el dato enviado no está relacionado en la base de datos
            console.log('el  dato no está de relacionada en la base de datos: '+data[key]);
            
        }
        
        // else if(data[key] === null){
        //     values.push(`'`+data[key]+`'`)
        // }else{
        //     values.push(data[key])
        // }
    }
    console.log({values});
    return ({keys,values});
}

/**
 * genera un sql que se ejecuta para insertar en la base de datos
 * @param {JSON} data datos que se van a insertar en la vase de datos
 */
let getKeyesAndValues= async (tableName,data)=>{
    let {keys,values}= await validateDateInsert(tableName,data);
    values = values.join();
    values = values.replace(/'null'/g,`null`)
    let resp = {keys:keys.join(),values}
    return resp;
}
/**
 * genera una consiulta para actualizar un registro
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} id {name:'id',value:'1'} name = nombre de el campo , value = valor del campo de ese id
 * @returns {JSON} {sqlList,sqlCount}, sqlList = select * from ..where id  = 1 , sqlCount = select count(*) ..where id  = 1
 */
let generateSqlAdd = async (tableName,data)=>{
    let {keys,values} = await getKeyesAndValues(tableName,data);
    let sqlList = `INSERT INTO ${tableName} (${keys}) VALUES (${values})`;
    console.log(sqlList);
    return sqlList;
}

/**
 * actualizar los campos necesarios de una tabla por id
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} id {name:'id',value:'1'} name = nombre de el campo , value = valor del campo de ese id
 * @param {JSON} data {name:'felipe',...} campos que se quieran actualizar
 */
exports.add = async (tableName,data) =>{
    try {
        let sqlAdd = await generateSqlAdd(tableName,data);       
        let result = await executeSql(sqlAdd);       
        return result;
    } catch (error) {
        throw error
    }
}

// /**
//  * convierte un json en un string entendible para el sql
//  * @param {JSON} values json de los datos a actualuizar
//  */
// let getSetValues = (values) =>{
//     let stringValues =JSON.stringify(values).replace(/"/g,``).replace(/:/g,` = `).replace(/{/g,``).replace(/}/g,``)
//     return stringValues;  
// }
/**
 * genera un sql que se ejecuta para insertar en la base de datos
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} data {name:'felipe',...} campos que se quieran actualizar
 */
let getSetValues= async(tableName,data)=>{  
    let stringResp = "";
    // let iAux = 0;
    let {keys,values}= await validateDateInsert(tableName,data);
    console.log({keys,values});
    
    for (let i = 0; i < keys.length; i++) {
        if(i !== 0){
            stringResp+=', '
        }
        if(values[i] === `'null'`){
            values[i] = null;
        }
        // values[i] = values[i].replace(/'null'/g,`null`);
        stringResp+= `${keys[i]} = ${values[i]}` 
        // const element = keys[i];
        
    }
    // for (const key in data) {
    //     if(iAux !== 0){
    //         stringResp+=', '
    //     }
    //     let value ="";     
    //     if(typeof data[key] === 'string'){
    //        value = `'`+data[key]+`'`;
    //     }else{
    //         value = data[key];
    //     }
    //     stringResp+= `${key} = ${value}` 
    //     iAux++;
    // }
 
    return stringResp;
}

/**
 * genera una consiulta para actualizar un registro
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} data {name:'felipe',...} campos que se quieran actualizar
 * @param {JSON} id {name:'id',value:'1'} name = nombre de el campo , value = valor del campo de ese id
 * @returns {JSON} {sqlList,sqlCount}, sqlList = select * from ..where id  = 1 , sqlCount = select count(*) ..where id  = 1
 */
let generateSqlUpdateById =async (tableName,data,id)=>{
    let setValues = await getSetValues(tableName,data);
    let sqlList = `UPDATE ${tableName} SET ${setValues} WHERE ${id.name} = ${id.value}`;
    console.log(sqlList);
    return sqlList;
}

/**
 * actualizar los campos necesarios de una tabla por id
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} id {name:'id',value:'1'} name = nombre de el campo , value = valor del campo de ese id
 * @param {JSON} data {name:'felipe',...} campos que se quieran actualizar
 */
exports.updateById = async (tableName,data,id) =>{
    try {
        // console.log({tableName,data,id});        
        let sqlUpdate = await generateSqlUpdateById(tableName,data,id);       
        let result = await executeSql(sqlUpdate);       
        return result;
    } catch (error) {
        throw error
    }
}

/**
 * genera una consiulta para eliminar un registro
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} id {name:'id',value:'1'} name = nombre de el campo , value = valor del campo de ese id
 * @returns {JSON}  delete from table..where id  = 1
 */
let generateSqlDeleteById =(tableName,id)=>{    
    let sqlList = `DELETE FROM ${tableName} WHERE ${id.name} = ${id.value}`;
    console.log(sqlList);
    return sqlList;
  
}
/**
 * elimina un registro por el id
 * @param {string} tableName nombre de la tabla de la base de datos
 * @param {JSON} id {name:'id',value:'1'} name = nombre de el campo , value = valor del campo de ese id
 */
exports.deleteById = async (tableName,id) =>{
    try {
        let sqlDelete = generateSqlDeleteById(tableName,id);       
        let result = await executeSql(sqlDelete);       
        return result;
    } catch (error) {
        throw error
    }
}

let getMetadataOfTable = async (tableName)=>{
    let sql = 
    `select decode( 
    t.table_name
    , lag(t.table_name, 1) over(order by t.table_name)
    , null
    , t.table_name ) as table_name 
    , t.column_name                         
    , t.data_type
    , t.nullable
    , cc.constraint_name
    , uc.constraint_type
    from user_tab_columns t
      left join user_cons_columns cc
        on (cc.table_name = t.table_name and
            cc.column_name = t.column_name)
      left join user_constraints uc
        on (t.table_name = uc.table_name and
            uc.constraint_name = cc.constraint_name )
    where t.table_name in ('${tableName.toUpperCase()}')`
    let metadata = await executeSqlAndExtractJSON(sql);
    return metadata;
}

