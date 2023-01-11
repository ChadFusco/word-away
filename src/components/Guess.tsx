import React, { ReactElement, useState } from 'react';
import '../styles/Guess.css';
import Tile from './Tile';

interface Props {
  guessID: number
}

function Guess(): JSX.Element {
  const guessID: number = 0;
  const letterIDs: number[] = [0, 1, 2, 3, 4, 5];

  const [guess, setGuess] = useState<string[]>(['', '', '', '', '', '']);

  const updateGuess = (id: number, value: string): void => {
    setGuess((prevGuess) => (prevGuess.map((char, i) => (i === id ? value : char))));
  };

  return (
    <form className="guess">
      {letterIDs.map((letterID: number): ReactElement => {
        const tileID = `letter${guessID}-${letterID}`;
        return (
          <Tile
            key={`${tileID}ID`}
            letterID={letterID}
            updateGuess={updateGuess}
          />
        );
      })}
    </form>
  );
}

export default Guess;
