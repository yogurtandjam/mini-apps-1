var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('port',3000);

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json())
app.listen(app.get('port'));
console.log('Listening on',app.get('port'));

app.post('/messages', function (req, res) {
  var result = 'row,parent,';
  let rowCount = 0;
  let parent = -1;
  for (var i in req.body) {
    if (!Array.isArray(req.body[i])) {result += i + ',';}
  }
  result = result.slice(0, -1);
  var recurse = function (data) {
    if (parent >= 0) {result += '<br>' + rowCount + ',' + parent + ',';}
    else {result += '<br>' + rowCount + ', ,';}
    rowCount++;
    parent++;
    for (var i in data) {
      if (!Array.isArray(data[i])) {result += data[i] + ',';}
      else {
        result = result.slice(0, -1);
        for (var j = 0; j < data[i].length; j++) {
          recurse(data[i][j])
          parent--;
        }
      }
    }
  }
  recurse(req.body);
  res.json(result)
})
app.recurse = function (data) {

}
//
// app.cvs(data, callback) {
//   for (var i in data) {
//
//   }
// }
