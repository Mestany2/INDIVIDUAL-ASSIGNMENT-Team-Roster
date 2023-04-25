import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSinglePlayer } from '../api/playerData';
import PlayerForm from '../components/forms/PlayerForm';

export default function EditPlayer() {
  const [editPlayer, setEditPlayer] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditPlayer);
  }, [firebaseKey]);
  return (<PlayerForm obj={editPlayer} />);
}
