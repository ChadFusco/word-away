import React, { useState, ReactElement } from 'react';
import '../styles/App.css';
import Guess from './Guess';
import type { GuessesT, GuessT } from '../dataStructure';

export default function App(): JSX.Element {
  // initialize "guesses" state on page load
  const initialGuessArr: string[] = ['', '', '', '', '', ''];
  const initialMatchedArr: number[] = [0, 0, 0, 0, 0, 0];
  const initialGuesses: GuessesT = [{
    guessID: 0,
    guessWord: initialGuessArr,
    guessed: false,
    matched: initialMatchedArr,
  }];
  for (let i = 1; i < 5; i += 1) {
    initialGuesses.push({
      guessID: i,
      guessWord: initialGuessArr,
      guessed: false,
      matched: initialMatchedArr,
    });
  }

  // COMPONENT STATES
  const [guesses, setGuesses] = useState<GuessesT>(initialGuesses);
  const [answer] = useState<string[]>(('BINARY'.split('')));

  const checkAnswer = (submittedGuess: GuessT) => {
    const newMatchedArr: number[] = submittedGuess.guessWord.map((char: string, i: number) => {
      if (answer.indexOf(char) === -1) {
        return 0;
      }
      return (char === answer[i] ? 2 : 1);
    });

    const newGuess = { ...submittedGuess, guessed: true, matched: newMatchedArr };

    setGuesses((prevGuesses: GuessesT) => prevGuesses.map((guessItem: GuessT) => (
      guessItem.guessID === newGuess.guessID ? newGuess : guessItem
    )));
  };

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
          checkAnswer={checkAnswer}
        />
      ))}
    </div>
  );
}
