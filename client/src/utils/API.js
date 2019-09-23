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
  fetchFiltersOptions: function() {
    return axios.get(`${baseUrl}/filtersOptions`);
  },
};

function buildUrl(filters) {
  let url = `${baseUrl}/boats?`;
  let isFirstParam = true;

  for (let key in filters) {
    if (filters[key] !== null && filters[key] !== '') {
      console.log(
        typeof filters[key] == 'object',
        filters[key].length,
        filters[key]
      );
      if (typeof filters[key] == 'object' && filters[key].length < 1) {
        continue;
      }
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

/* function buildUrl2(filters) {
  let query = '';
  let isFirstParam = true;

  for (let key in filters) {
    if (filters[key] !== null) {
      if (isFirstParam) {
        query = `${query}"${key}":${filters[key]}`;
        isFirstParam = false;
      } else {
        query = `${query},"${key}":${filters[key]}`;
      }
    }
  }

  console.log(`${baseUrl}/graphql?query=getBoats(${query})`);
  return `${baseUrl}/graphql?query=query getBoats(${query})`;
} */
