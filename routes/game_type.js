var express = require('express');
var router = express.Router();

var db = require('../models/db');
var sql = require('mssql');

router.post('/addtype', (req, res) => {
  var newtype = req.body.newtype; 
  var game_id = req.body.game_id;
  const query = `
    IF NOT EXISTS (SELECT 1 FROM [Steam].[dbo].[Type] WHERE name = @newtype)
    BEGIN
        INSERT INTO [Steam].[dbo].[Type] (name, state)
        VALUES (@newtype, 1);
    END
    INSERT INTO [Steam].[dbo].[Game_Type] (AppID, type)
    VALUES (@game_id, @newtype);
  `;
  
  sql.connect(db)
    .then(() => {
      return new sql.Request()
        .input('newtype', newtype)
        .input('game_id', game_id)
        .query(query);
    })
    .then(() => {
      console.log('Type add success!');
      console.log('newType add success!');
      res.send('Type added successfully');
      sql.close();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Type add Error');
      sql.close();
    });
});

router.get('/more_type', (req, res) => {
  const query = `
  SELECT name FROM [Steam].[dbo].[Type] WHERE state = 1
  `;
  sql.connect(db)
    .then(() => {
      return new sql.Request().query(query);
    })
    .then((result) => {
      console.log('get moretype success!');
      sql.close();
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('get moretype Error');
      sql.close();
    });
});


router.get('/preset_type', (req, res) => {
  const query = `
  SELECT name FROM [Steam].[dbo].[Type] WHERE state = 0
  `;
  sql.connect(db)
    .then(() => {
      return new sql.Request().query(query);
    })
    .then((result) => {
      console.log('get presettype success!');
      sql.close();
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('get presettype Error');
      sql.close();
    });
});

module.exports = router;