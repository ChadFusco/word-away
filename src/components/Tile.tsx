import React from 'react';
import '../styles/Tile.css';

interface Props {
  letterID: number
  updateGuess: Function
}

function Tile({ letterID, updateGuess }: Props): JSX.Element {
  return (
    <h3>
      <input
        className="tile"
        type="text"
        size={1}
        maxLength={1}
        onChange={(e) => updateGuess(letterID, e.target.value)}
        required
      />
    </h3>
  );
}

export default Tile;
