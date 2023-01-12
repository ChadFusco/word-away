import React, { useState } from 'react';
import '../styles/Tile.css';

type Props = {
  letterID: number,
  updateGuess: Function
};

function Tile({ letterID, updateGuess }: Props): JSX.Element {
  // COMPONENT STATES
  const [letter, setLetter] = useState<string>('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLetter(e.target.value.toUpperCase());
    updateGuess(letterID, e.target.value);
  }

  return (
    <h3>
      <input
        className="tile"
        type="text"
        size={1}
        maxLength={1}
        value={letter}
        onChange={handleChange}
      />
    </h3>
  );
}

export default Tile;
