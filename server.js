const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

//Fetching boat list
const boatList = require('./data/boatList.json');

//Getting min/max values for filters and creating boat type list and boat location list
let boatLocationList = [];
let boatTypeList = [];
let defaultMinLength = 0;
let defaultMaxLength = 0;
let defaultMinGuests = 0;
let defaultMaxGuests = 0;
let defaultMinRating = 0;
let defaultMaxRating = 5;

boatList.forEach(boat => {
  if (boatLocationList.indexOf(boat.location) === -1) {
    boatLocationList.push(boat.location);
  }
  if (boatTypeList.indexOf(boat.type) === -1) {
    boatTypeList.push(boat.type);
  }
  if (boat.length > defaultMaxLength) {
    defaultMaxLength = boat.length;
  }
  if (boat.nr_guests > defaultMaxGuests) {
    defaultMaxGuests = boat.nr_guests;
  }
});

boatLocationList = boatLocationList.map(location => ({
  value: location,
  label: location,
}));

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
  extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json());

// Express only serves static assets in production
app.use(express.static(path.join(__dirname, 'client/build')));

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
  const params = req.query;
  const filters = params;
  const page = parseInt(params.page);
  const rowsPerPage = parseInt(params.rowsPerPage);

  let filteredList = getBoats(filters);

  const count = filteredList.length;
  filteredList = filteredList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  res.json({ boatList: filteredList, count: count });
});

app.get('/api/filtersOptions', function(req, res) {
  res.json({
    locationList: boatLocationList,
    boatTypeList: boatTypeList,
    ratingOptions: [defaultMinRating, defaultMaxRating],
    lengthOptions: [defaultMinLength, defaultMaxLength],
    guestsNumberOptions: [defaultMinGuests, defaultMaxGuests],
  });
});

// Filtering function
var getBoats = function(args) {
  let filteredList = boatList;
  if (args.minLength) {
    filteredList = filteredList.filter(boat => {
      return boat.length > args.minLength;
    });
  }

  if (args.maxLength) {
    filteredList = filteredList.filter(boat => {
      return boat.length < args.maxLength;
    });
  }

  if (args.minGuests) {
    filteredList = filteredList.filter(boat => {
      return boat.nr_guests > args.minGuests;
    });
  }

  if (args.maxGuests) {
    filteredList = filteredList.filter(boat => {
      return boat.nr_guests < args.maxGuests;
    });
  }

  if (args.minRating) {
    filteredList = filteredList.filter(boat => {
      return boat.review_rating > args.minRating;
    });
  }

  if (args.maxRating) {
    filteredList = filteredList.filter(boat => {
      return boat.review_rating < args.maxRating;
    });
  }

  if (args.type && args.type.length > 0) {
    filteredList = filteredList.filter(boat => {
      return args.type.includes(boat.type);
    });
  }

  if (args.location && args.location.length > 0) {
    filteredList = filteredList.filter(boat => {
      return args.location.includes(boat.location);
    });
  }

  return filteredList;
};

// Serving the unknown routes to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Express Server Now Running on port ${PORT}`)
);
