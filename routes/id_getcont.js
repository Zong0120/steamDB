var express = require('express');
var router = express.Router();

var db = require('../models/db');
var sql = require('mssql');

router.get('/id_getOS', (req, res) => {
  var game_id=req.query.game_id;
  const query = `SELECT name FROM [Steam].[dbo].[Compatibility] WHERE AppID = @game_id`;

  sql.connect(db)
    .then(() => {
      return new sql.Request().input('game_id', game_id).query(query)
    })
    .then((result) => {
      sql.close();
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
      sql.close();
    });
});


router.get('/id_gettype', (req, res) => {
  var game_id=req.query.game_id;
  const query = `SELECT type FROM [Steam].[dbo].[Game_Type] WHERE AppID = @game_id`;

  sql.connect(db)
    .then(() => {
      return new sql.Request().input('game_id', game_id).query(query)
    })
    .then((result) => {
      sql.close();
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
      sql.close();
    });
});

module.exports = router;