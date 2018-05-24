var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');
var db = mongoose.connection;

var name = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
})

var add = new mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  state: String,
  zip: String
})

var pay = new mongoose.Schema({
  ccNumber: String,
  expDate: String,
  CVV: String,
  billing_zip: String
})

var User = mongoose.model("Users", name);

app.set('port',3000);
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.listen(app.get('port'))
app.get('/newUser', function(req, res) {
  res.send('New User Created!')
})
app.post('/userName', function(req, res) {
    var data = req.body;
    db.collection('Users')
    .insertOne(
      {
        name: data.name,
        email: data.email,
        password: data.password
      }
    )
    res.send('username, email, and password updated successfully')
  })
  app.post('/userAddress', function(req, res) {
    var data = req.body;
    db.collection('Users')
    .insertOne(
      {
        line1: data.line1,
        line2: data.line2,
        city: data.city,
        state: data.state,
        zip: data.zip
      }
    )
    res.send('address updated successfully')
  })
  app.post('/userPayment', function(req, res) {
    var data = req.body;
    db.collection('Users')
    .insertOne(
      {
        cc: data.ccNumber,
        exp: data.expDate,
        cvv: data.CVV,
        billing: data.billing_zip
      }
    )
  })
