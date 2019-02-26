var express = require('express');
var router = express.Router();

// router.get('/', function(req, res) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//   res.setHeader('Access-Control-Allow-Credentials', true); // If needed

//   res.send('cors problem fixed:)');
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reporte1', { title: 'Felipe' });
});
router.get('/reporte1Pdf', function(req, res, next) {
  res.render('reporte1', { title: 'Felipe' });
});
const users = require('../controllers/users');
const equipo = require('../controllers/equipo');
const ingresoAManteminiento = require('../controllers/ingresoAManteminiento');
const usuarios = require('../controllers/usuarios');

const manManten = require('../controllers/manManten');
const genEstado = require('../controllers/genEstado');
const genUsuarios = require('../controllers/genUsuarios');
const genCasa = require('../controllers/genCasa');
const genTablas = require('../controllers/genTablas');
const companiaSedeArea = require('../controllers/companiaSedeArea');
const manTipoEquipo = require('../controllers/manTipoEquipo');
const genMarca = require('../controllers/genMarca');
const genMarcaLinea = require('../controllers/genMarcaLinea');
const getTipoCombustible = require('../controllers/getTipoCombustible');
const genUnidadMedida = require('../controllers/genUnidadMedida');
const manTarea = require('../controllers/manTarea');
const genUnidad = require('../controllers/genUnidad');
const genPerfil = require('../controllers/genPerfil');
const testPdf = require('../controllers/testPdf');

const genCompania = require('../controllers/genCompania');
const genCompaniaSede = require('../controllers/genCompaniaSede');



router.get('/users',users.get);
router.get('/users/:id',users.getById);
router.post('/users',users.add);
router.put('/users',users.update);
router.delete('/users/:id',users.delete);
router.get('/prueba',users.prueba);
router.get('/prueba2',users.prueba2);

router.get('/equipo',equipo.get);
router.get('/equipo/:id',equipo.getById);
router.post('/equipo',equipo.add);
router.put('/equipo',equipo.update);
router.delete('/equipo/:id',equipo.delete);
router.get('/equipo/consult/estadoActivo',equipo.getByActive);

router.get('/ingresoAManteminiento',ingresoAManteminiento.get);
router.get('/ingresoAManteminiento/:id',ingresoAManteminiento.getById);
router.post('/ingresoAManteminiento',ingresoAManteminiento.add);
router.put('/ingresoAManteminiento',ingresoAManteminiento.update);
router.delete('/ingresoAManteminiento/:id',ingresoAManteminiento.delete);

router.get('/usuarios',usuarios.get);
router.get('/usuarios/:id',usuarios.getById);
router.post('/usuarios',usuarios.add);
router.put('/usuarios',usuarios.update);

router.get('/manManten',manManten.get);
router.get('/manManten/:id',manManten.getById);
router.post('/manManten',manManten.add);
router.put('/manManten',manManten.update);
router.delete('/manManten/:id',manManten.delete);
router.get('/manManten/consult/estadoActivo',manManten.getByActive);

router.get('/genEstado',genEstado.get);// llama todos los campos de la tabla estado
router.get('/genEstado/:id',genEstado.getById);// consulta el campo ID  por la llave primaria
router.post('/genEstado',genEstado.add);// envia insert
router.put('/genEstado',genEstado.update);// put actuliza
router.delete('/genEstado/:id',genEstado.delete);//elimina

// router.get('/genEstado/consult/pdf',genEstado.genPdf);

router.get('/genCompania',genCompania.get);// llama todos los campos de la tabla estado
router.get('/genCompania/:id',genCompania.getById);// consulta el campo ID  por la llave primaria
router.post('/genCompania',genCompania.add);// envia insert
router.put('/genCompania',genCompania.update);// put actuliza
router.delete('/genCompania/:id',genCompania.delete);//elimina

router.get('/genCompaniaSede',genCompaniaSede.get);// llama todos los campos de la tabla estado
router.get('/genCompaniaSede/:id',genCompaniaSede.getById);// consulta el campo ID  por la llave primaria
router.post('/genCompaniaSede',genCompaniaSede.add);// envia insert
router.put('/genCompaniaSede',genCompaniaSede.update);// put actuliza
router.delete('/genCompaniaSede/:id',genCompaniaSede.delete);//elimina


const genEstado2 = require('../controllers/genEstado2')
router.get('/genEstado2',genEstado2.get);// llama todos los campos de la tabla estado
router.get('/genEstado2/:id',genEstado2.getById);// consulta el campo ID  por la llave primaria
router.post('/genEstado2',genEstado2.add);// envia insert
router.put('/genEstado2',genEstado2.update);// put actuliza
router.delete('/genEstado2/:id',genEstado2.delete);//elimina



router.get('/genUsuarios',genUsuarios.get);
router.get('/genUsuarios/:id',genUsuarios.getById);
router.post('/genUsuarios',genUsuarios.add);
router.put('/genUsuarios',genUsuarios.update);
router.delete('/genUsuarios/:id',genUsuarios.delete);

router.get('/genCasa',genCasa.get);
router.get('/genCasa/:id',genCasa.getById);
router.post('/genCasa',genCasa.add);
router.put('/genCasa',genCasa.update);
router.delete('/genCasa/:id',genCasa.delete);

router.get('/genTablas',genTablas.get);
router.get('/genTablas/:id',genTablas.getById);
router.post('/genTablas',genTablas.add);
router.put('/genTablas',genTablas.update);
router.delete('/genTablas/:id',genTablas.delete);

router.get('/companiaSedeArea',companiaSedeArea.get);
router.get('/companiaSedeArea/:id',companiaSedeArea.getById);
router.post('/companiaSedeArea',companiaSedeArea.add);
router.put('/companiaSedeArea',companiaSedeArea.update);
router.delete('/companiaSedeArea/:id',companiaSedeArea.delete);
router.get('/companiaSedeArea/consult/estadoActivo',companiaSedeArea.getByActive);

router.get('/manTipoEquipo',manTipoEquipo.get);
router.get('/manTipoEquipo/:id',manTipoEquipo.getById);
router.post('/manTipoEquipo',manTipoEquipo.add);
router.put('/manTipoEquipo',manTipoEquipo.update);
router.delete('/manTipoEquipo/:id',manTipoEquipo.delete);
router.get('/manTipoEquipo/consult/estadoActivo',manTipoEquipo.getByActive);

router.get('/genMarca',genMarca.get);
router.get('/genMarca/:id',genMarca.getById);
router.post('/genMarca',genMarca.add);
router.put('/genMarca',genMarca.update);
router.delete('/genMarca/:id',genMarca.delete);
router.get('/genMarca/consult/estadoActivo',genMarca.getByActive);

router.get('/genMarcaLinea',genMarcaLinea.get);
router.get('/genMarcaLinea/:id',genMarcaLinea.getById);
router.post('/genMarcaLinea',genMarcaLinea.add);
router.put('/genMarcaLinea',genMarcaLinea.update);
router.delete('/genMarcaLinea/:id',genMarcaLinea.delete);
router.get('/genMarcaLinea/consult/estadoActivo',genMarcaLinea.getByActive);

router.get('/getTipoCombustible',getTipoCombustible.get);
router.get('/getTipoCombustible/:id',getTipoCombustible.getById);
router.post('/getTipoCombustible',getTipoCombustible.add);
router.put('/getTipoCombustible',getTipoCombustible.update);
router.delete('/getTipoCombustible/:id',getTipoCombustible.delete);
router.get('/getTipoCombustible/consult/estadoActivo',getTipoCombustible.getByActive);

router.get('/genUnidadMedida',genUnidadMedida.get);
router.get('/genUnidadMedida/:id',genUnidadMedida.getById);
router.post('/genUnidadMedida',genUnidadMedida.add);
router.put('/genUnidadMedida',genUnidadMedida.update);
router.delete('/genUnidadMedida/:id',genUnidadMedida.delete);
router.get('/genUnidadMedida/consult/estadoActivo',genUnidadMedida.getByActive);

router.get('/manTarea',manTarea.get);
router.get('/manTarea/:id',manTarea.getById);
router.post('/manTarea',manTarea.add);
router.put('/manTarea',manTarea.update);
router.delete('/manTarea/:id',manTarea.delete);
router.get('/manTarea/consult/estadoActivo',manTarea.getByActive);

router.get('/testPdf',testPdf.genPdfPipe);

router.get('/genUnidad',genUnidad.get);
router.get('/genUnidad/:id',genUnidad.getById);
router.post('/genUnidad',genUnidad.add);
router.put('/genUnidad',genUnidad.update);
router.delete('/genUnidad/:id',genUnidad.delete);

router.get('/genPerfil',genPerfil.get);
router.get('/genPerfil/:id',genPerfil.getById);
router.post('/genPerfil',genPerfil.add);
router.put('/genPerfil',genPerfil.update);
router.delete('/genPerfil/:id',genPerfil.delete);


module.exports = router;