const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(process.env.PORT || 5000, () => console.log('App listening on port 3000!'))

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


var mysql = require('mysql');
// var connection = mysql.createConnection({
//     insecureAuth : true,
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'user_management'      
// });

var connection = mysql.createConnection({
  insecureAuth : true,
  host     : 'us-cdbr-iron-east-05.cleardb.net',
  user     : 'b14181c70f2106',
  password : '6a5000bd',
  database : 'heroku_41ca7e2161854d5'      
});
    
connection.connect();    

app.get('/user/list', (req, res) =>{    
    connection.query('SELECT * FROM Users', function (err, rows, fields) {
      if (err) throw err    
      res.json(rows);
    }); 
});

app.get('/user/:id', (req, res) =>{
  connection.query('SELECT * FROM Users WHERE id = '+req.params.id, function (err, row, fields) {
    if (err) throw err 
    res.json(row[0]);
  });
});

app.post('/user/save', (req, res) =>{
  var data = req.body;
  data.dob = data.dob.substr(0,10);
  console.log("data",data, typeof req.body.dob);

  if(data.id){
    connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, contact_number = ?, dob = ? WHERE id = ?', [data.first_name,data.last_name,data.email,data.contact_number,data.dob, data.id], function (error, results, fields) {
      if (error) throw error;
      res.json(data.id);
    });
  } else{
    connection.query('INSERT INTO Users SET ?', data, function (error, results, fields) {
      if (error) throw error;
      res.json(results.insertId);
    });
  }
  
});

app.post('/user/delete', (req, res) =>{
  connection.query('DELETE FROM users WHERE id = ?', [req.body.user_id], function (error, results, fields) {
    if (error) throw error;
    res.json(req.body.user_id);
  });

});