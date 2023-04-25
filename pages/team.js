import React, { useEffect, useState } from 'react';
import PlayerCard from '../components/PlayerCard';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';

export default function ViewTeam() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  const getAllPlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {players.map((player) => (
        <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
      ))}
    </div>
  );
}
