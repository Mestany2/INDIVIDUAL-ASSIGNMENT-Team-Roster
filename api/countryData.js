import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getCountries = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/countries.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleCountry = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/countries/${firebaseKey}.json`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getCountries, getSingleCountry };
