let oracledb = require('oracledb');
oracledb.autoCommit = true;
var dbConfig = require('../config');

let conectar =()=>{
    return new Promise((resolve,reject)=>{
        oracledb.getConnection(
            {
              user          : dbConfig.user,
              password      : dbConfig.password,
              connectString : dbConfig.connectString
            },
            function(err, connection) {
              if (err) {
                reject(err.message);
                return;
              }
              resolve(connection);
            });
    });
}

exports.conectar = conectar;
function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}

