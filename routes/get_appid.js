var express = require('express');
var router = express.Router();

var db = require('../models/db');
var sql = require('mssql');

router.get('/getgame_company', function(req, res) {
  sql.connect(db, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      const query = `SELECT name FROM [Steam].[dbo].[Company]`;
  
      new sql.Request().query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        // 關閉連線
        sql.close();

        if (result.recordset.length === 0) {
            res.send([{ name: "No company found" }]);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(result.recordset);
        }
      });
  });
});

router.get('/getgame_series', function(req, res) {
  sql.connect(db, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      const query = `SELECT name FROM [Steam].[dbo].[Series]`;
  
      new sql.Request().query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        // 關閉連線
        sql.close();

        if (result.recordset.length === 0) {
            res.send([{ name: "No company found" }]);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(result.recordset);
        }
      });
  });
});

router.get('/OS_getgame', (req, res) => {
  var game_OS=req.query.game_OS;
  const query = `SELECT AppID FROM [Steam].[dbo].[Compatibility] WHERE name = @game_OS`;

  sql.connect(db)
    .then(() => {
      return new sql.Request().input('game_OS', game_OS).query(query)
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

router.get('/type_getgame', (req, res) => {
  var game_type=req.query.game_type;
  const query = `SELECT AppID FROM [Steam].[dbo].[Game_Type] WHERE type = @game_type`;

  sql.connect(db)
    .then(() => {
      return new sql.Request().input('game_type', game_type).query(query)
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