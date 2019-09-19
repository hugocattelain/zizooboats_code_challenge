const express = require('express');
const bodyParser = require('body-parser');

const boatList = require('./data/boatList.json');

const app = express();
const port = 3001;

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//CORS Definition
app.use(function(req, res, next) {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/api/boats', function(req, res) {
  let filteredList;
  const params = req.query;
  const page = parseInt(params.page);
  const rowsPerPage = parseInt(params.rowsPerPage);

  filteredList = boatList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  res.json(filteredList);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
