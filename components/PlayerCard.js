import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSinglePlayer } from '../api/playerData';
import viewPlayerCountry from '../api/mergedData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  const [showInfo, setShowInfo] = useState(false);
  const [playerCountry, setPlayerCountry] = useState();

  useEffect(() => {
    viewPlayerCountry(playerObj.firebaseKey).then(setPlayerCountry);
  }, []);

  const onClick = () => setShowInfo(true);

  return (
    <>
      <div id="card">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 267.3 427.3">
          <clipPath id="svgPath">
            <path fill="#000" d="M265.3 53.9a33.3 33.3 0 0 1-17.8-5.5 32 32 0 0 1-13.7-22.9c-.2-1.1-.4-2.3-.4-3.4 0-1.3-1-1.5-1.8-1.9a163 163 0 0 0-31-11.6A257.3 257.3 0 0 0 133.7 0a254.9 254.9 0 0 0-67.1 8.7 170 170 0 0 0-31 11.6c-.8.4-1.8.6-1.8 1.9 0 1.1-.2 2.3-.4 3.4a32.4 32.4 0 0 1-13.7 22.9A33.8 33.8 0 0 1 2 53.9c-1.5.1-2.1.4-2 2v293.9c0 3.3 0 6.6.4 9.9a22 22 0 0 0 7.9 14.4c3.8 3.2 8.3 5.3 13 6.8 12.4 3.9 24.8 7.5 37.2 11.5a388.7 388.7 0 0 1 50 19.4 88.7 88.7 0 0 1 25 15.5v.1-.1c7.2-7 16.1-11.3 25-15.5a427 427 0 0 1 50-19.4l37.2-11.5c4.7-1.5 9.1-3.5 13-6.8 4.5-3.8 7.2-8.5 7.9-14.4.4-3.3.4-6.6.4-9.9V231.6 60.5v-4.6c.4-1.6-.3-1.9-1.7-2z" />
          </clipPath>
        </svg>
        <div id="card-inner">
          <div id="card-top">
            <div className="info">
              <div className="card-btns">
                <Button type="button" variant="danger" onClick={deleteThisPlayer}> X </Button>
                <Link href={`/${playerObj.firebaseKey}`} passHref>
                  <Button type="button"> E </Button>
                </Link>
              </div>
              <div className="value">{playerObj.rating}</div>
              <div className="position">{playerObj.position}</div>
              <Card.Img className="country" src={playerCountry?.countryObj?.country_flag} />
              <Card.Img className="club" src={playerObj.club} />
            </div>

            <Card.Img className="image" src={playerObj.image} />
            <div className="backfont">FUT23</div>
          </div>
          <div id="card-bottom">
            <div className="text-center">
              <button type="button" className="name" onClick={onClick}>{playerObj.name}</button>
            </div>
            {showInfo ? (
              <div className="stats">
                <div>
                  <ul>
                    <li><span>{playerObj.pac}</span><span>pac</span></li>
                    <li><span>{playerObj.sho}</span><span>sho</span></li>
                    <li><span>{playerObj.pas}</span><span>pas</span></li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li><span>{playerObj.dri}</span><span>dri</span></li>
                    <li><span>{playerObj.def}</span><span>def</span></li>
                    <li><span>{playerObj.phy}</span><span>phy</span></li>
                  </ul>
                </div>
              </div>
            ) : <div /> }

          </div>

        </div>
      </div>
      {/* <Link href={`/author/${authorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
      {/* <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link> */}
    </>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    club: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    pac: PropTypes.number,
    pas: PropTypes.number,
    phy: PropTypes.number,
    sho: PropTypes.number,
    dri: PropTypes.number,
    def: PropTypes.number,
    position: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
