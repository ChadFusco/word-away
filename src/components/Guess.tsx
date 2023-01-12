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
  const updateGuess = (id: number, value: string): void => {
    const newGuessWord = guess.guessWord.map((char: string, i: number) => (
      i === id ? value : char
    ));
    const newGuess = { ...guess, guessWord: newGuessWord };
    setGuesses((prevGuesses: GuessesT) => prevGuesses.map((guessItem: GuessT) => (
      guessItem.guessID === newGuess.guessID ? newGuess : guessItem
    )));

    // Only check the answer (and update tile colors) if all letters are entered
    if (newGuessWord.join('').length === 6) {
      checkAnswer(newGuess);
    }
  };

  return (
    <form className="guess">
      {guess.guessWord.map((letter: string, i: number): ReactElement => {
        const tileID = `letter${guess.guessID}-${i}`;
        return (
          <Tile
            key={`${tileID}ID`}
            letterID={i}
            updateGuess={updateGuess}
            match={guess.matched[i]}
          />
        );
      })}
    </form>
  );
}

export default Guess;
