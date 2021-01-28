var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ status: 200, data: '服务OK!!!' })
});

module.exports = router;
