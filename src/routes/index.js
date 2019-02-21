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
  res.render('index', { title: 'Express' });
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

router.get('/genEstado',genEstado.get);


router.get('/genEstado/consult/estadoActivo',genEstado.getByActive);
router.get('/genEstado/:id',genEstado.getById);
router.post('/genEstado',genEstado.add);
router.put('/genEstado',genEstado.update);
router.delete('/genEstado/:id',genEstado.delete);

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

module.exports = router;