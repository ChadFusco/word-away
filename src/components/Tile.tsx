/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import '../styles/Tile.css';
import type { TileStyleT } from '../dataStructure';

type Props = {
  letterID: number,
  letter: string,
  updateGuess: Function,
  match: number,
  correct: boolean,
  valid: boolean,
};

function Tile({
  letterID, letter, updateGuess, match, correct, valid,
}: Props): JSX.Element {
  // COMPONENT STATES
  const [tileStyle, setTileStyle] = useState<TileStyleT>({ backgroundColor: 'white' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // setLetter(e.target.value.toUpperCase());
    updateGuess(letterID, e.target.value.toUpperCase());
  }

  useEffect(() => {
    // console.log('useEffect inside Tile fired! match:', match);
    const color: string = (() => {
      switch (match) {
        case 1: return 'yellow';
        case 2: return 'green';
        default: return 'white';
      }
    })();
    setTileStyle({
      backgroundColor: color,
    });
  }, [match]);

  return (
    <h3>
      <input
        className={correct ? 'tileSpin' : (valid ? 'tile' : 'tileShake')}
        type="text"
        size={1}
        maxLength={1}
        value={letter}
        onChange={handleChange}
        style={tileStyle}
      />
    </h3>
  );
}

export default Tile;
