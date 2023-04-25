import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../../api/playerData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  position: '',
  club: '',
  image: '',
  country: '',
  rating: 0,
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const attGene = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push('/team'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        pac: attGene(50, 99),
        sho: attGene(50, 99),
        pas: attGene(50, 99),
        dri: attGene(50, 99),
        def: attGene(50, 99),
        phy: attGene(50, 99),
      };
      createPlayer(payload).then(() => {
        router.push('/team');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} a Player</h2>

      <FloatingLabel controlId="floatingInput1" label="Player Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Position" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player's position"
          name="position"
          value={formInput.position}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Rating" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Player's rating"
          name="rating"
          value={formInput.rating}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Country" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Country Flag"
          name="country"
          value={formInput.country}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Club" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Club Logo"
          name="club"
          value={formInput.club}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Player Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Player Image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} a Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    image: PropTypes.string,
    country: PropTypes.string,
    club: PropTypes.string,
    rating: PropTypes.number,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
