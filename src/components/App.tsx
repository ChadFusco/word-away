import React, { useState, ReactElement } from 'react';
import '../styles/App.css';
import Guess from './Guess';
import type { GuessesT, GuessT } from '../dataStructure';

export default function App(): JSX.Element {
  const initialGuessStr: string[] = ['', '', '', '', '', ''];
  const initialGuesses: GuessesT = [{
    guessID: 0,
    guessWord: initialGuessStr,
    guessed: false,
  }];
  for (let i = 1; i < 5; i += 1) {
    initialGuesses.push({
      guessID: i,
      guessWord: initialGuessStr,
      guessed: false,
    });
  }

  // COMPONENT STATES
  const [guesses, setGuesses] = useState<GuessesT>(initialGuesses);
  const [answer, setAnswer] = useState<string[]>(('BINARY'.split('')));

  // console.log(guesses);

  return (
    <div className="app">
      <div className="app-header">
        <h2>A Word Away...</h2>
      </div>
      {guesses.map((guess: GuessT): ReactElement => (
        <Guess
          key={`Guess${guess.guessID}`}
          guess={guess}
          setGuesses={setGuesses}
        />
      ))}
    </div>
  );
}
