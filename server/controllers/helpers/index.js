const fetch = require('node-fetch');

function fetchAll(resource) {
  return fetch(`http://127.0.0.1:12345/${resource}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    })
}

function post(endpoint, payload = {}) {
  return fetch(`http://localhost:12345/${endpoint}`, {
        method: 'post',
        body:    JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err;
    })
}

module.exports = {
  fetchAll,
  post
}