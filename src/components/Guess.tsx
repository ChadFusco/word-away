import React, { ReactElement } from 'react';
import '../styles/Guess.css';
import Tile from './Tile';
import type { GuessesT, GuessT } from '../dataStructure';

type Props = {
  guess: GuessT,
  setGuesses: Function,
  checkAnswer: Function,
};

function Guess({ guess, setGuesses, checkAnswer }: Props): JSX.Element {
  const guessID: number = 0;
  const letterIDs: number[] = [0, 1, 2, 3, 4, 5];

  const updateGuess = (id: number, value: string): void => {
    const newGuessWord = guess.guessWord.map((char: string, i: number) => (
      i === id ? value : char
    ));
    const newGuess = { ...guess, guessWord: newGuessWord };
    setGuesses((prevGuesses: GuessesT) => prevGuesses.map((guessItem: GuessT) => (
      guessItem.guessID === newGuess.guessID ? newGuess : guessItem
    )));

    if (newGuessWord.join('').length === 6) {
      checkAnswer(newGuess);
    }
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
