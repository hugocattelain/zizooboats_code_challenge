const axios = require('axios');

var baseUrl = 'https://zizooboats-code-challenge-hc.herokuapp.com/api';
if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000;
  baseUrl = 'http://localhost:' + PORT + '/api';
}

const headers = {
  'Content-Type': 'application/json',
};

export default {
  fetchBoatList: function(filters) {
    return axios.get(buildUrl(filters), { headers: headers });
  },
};

function buildUrl(filters) {
  let url = `${baseUrl}/boats?`;
  let isFirstParam = true;

  for (let key in filters) {
    if (filters[key] !== null) {
      if (isFirstParam) {
        url = `${url}${key}=${filters[key]}`;
        isFirstParam = false;
      } else {
        url = `${url}&${key}=${filters[key]}`;
      }
    }
  }

  return url;
}
