import { getSingleCountry } from './countryData';
import { getSinglePlayer } from './playerData';

const viewPlayerCountry = (playerFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerFirebaseKey)
    .then((playerObj) => {
      getSingleCountry(playerObj.country)
        .then((countryObj) => {
          resolve({ countryObj, ...playerObj });
        });
    }).catch((error) => reject(error));
});

export default viewPlayerCountry;
