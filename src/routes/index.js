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

router.get('/users',users.get);

router.get('/users/:id',users.getById);

router.post('/users',users.add);

router.put('/users/:id',users.update);

router.delete('/users/:id',users.delete);

router.get('/prueba',users.prueba);

router.get('/prueba2',users.prueba2);

module.exports = router;