var express = require('express');
var router = express.Router();

var db = require('../models/db');
var sql = require('mssql');

router.get('/have_game',function(req, res){
  sql.connect(db, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      var game_name=req.query.game_name;
      const query = `SELECT AppID FROM [Steam].[dbo].[Game] WHERE name = @game_name`;
  
      new sql.Request().input('game_name', game_name).query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        sql.close();
        res.send(result.recordset);
      });
  });
});

router.get('/name_getgame',function(req, res){
  sql.connect(db, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      var game_name=req.query.game_name;
      const query = `SELECT * FROM [Steam].[dbo].[Game] WHERE name = @game_name`;
  
      new sql.Request().input('game_name', game_name).query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        sql.close();
        res.send(result.recordset);
      });
      
  });
});

router.get('/company_getgame', (req, res) => {
  const game_company = req.query.game_company;
  const query = `SELECT * FROM [Steam].[dbo].[Game] WHERE company = @game_company`;

  sql.connect(db)
    .then(() => {
      return new sql.Request().input('game_company', game_company).query(query)
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

router.get('/id_getgame', (req, res) => {
  var game_id=req.query.game_id;
  const query = `SELECT * FROM [Steam].[dbo].[Game] WHERE AppID = @game_id`;

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


router.get('/price_getgame', (req, res) => {
  var game_price = req.query.game_price;
  var query = `SELECT * FROM [Steam].[dbo].[Game] WHERE price <= @game_price ORDER BY price DESC`;
  if (game_price == 10000)query = `SELECT * FROM [Steam].[dbo].[Game] WHERE price > 1500 ORDER BY price DESC`;
  sql.connect(db)
    .then(() => {
      return new sql.Request().input('game_price',sql.Int, game_price).query(query)
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

router.get('/date_getgame', (req, res) => {
  var game_date = req.query.game_date;
  var query = '';

  if (game_date == "oldgame") {
    query = `SELECT TOP 10 * FROM [Steam].[dbo].[Game] ORDER BY date ASC`;
  } 
  else if (game_date == "newgame") {
    query = `SELECT TOP 10 * FROM [Steam].[dbo].[Game] ORDER BY date DESC`;
  }
  sql.connect(db)
  .then(() => {
    return new sql.Request().query(query)
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

router.get('/cover_game', (req, res) => {
  var query =`SELECT TOP 5 name,AppID FROM [Steam].[dbo].[Game] ORDER BY date DESC`;
  sql.connect(db)
  .then(() => {
    return new sql.Request().query(query)
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

router.get('/series_getgame', (req, res) => {
  var game_series=req.query.game_series;
  const query = `SELECT * FROM [Steam].[dbo].[Game] WHERE seriesName = @game_series`;

  sql.connect(db)
    .then(() => {
      return new sql.Request().input('game_series', game_series).query(query)
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

router.get('/random_search', (req, res) => {
  const query = `random:SELECT TOP 5 * FROM [Steam].[dbo].[Game] ORDER BY NEWID()`;
  sql.connect(db)
  .then(() => {
    return new sql.Request().query(query)
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