import React, { useState, ReactElement, useEffect } from 'react';
import '../styles/App.css';
import Guess from './Guess';
import requests from '../requests';
import type { GuessesT, GuessT, AnswerT } from '../dataStructure';

export default function App(): JSX.Element {
  // initialize "guesses" state on page load
  const initialStrArr: string[] = ['', '', '', '', '', ''];
  const initialNumArr: number[] = [0, 0, 0, 0, 0, 0];
  const initialGuesses: GuessesT = [{
    guessID: 0,
    guessWord: initialStrArr,
    guessed: false,
    matched: initialNumArr,
  }];
  for (let i = 1; i < 5; i += 1) {
    initialGuesses.push({
      guessID: i,
      guessWord: initialStrArr,
      guessed: false,
      matched: initialNumArr,
    });
  }

  // COMPONENT STATES
  const [guesses, setGuesses] = useState<GuessesT>(initialGuesses);
  // const [answer] = useState<string[]>(('BINARY').split(''));
  const [curAnswerID, setCurAnswerID] = useState<number>(1);
  const [answer, setAnswer] = useState<string[]>(initialStrArr);
  const [synonym, setSynonym] = useState<string>('');

  console.log('curAnswerID:', curAnswerID);
  console.log('synonym:', synonym);

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

  const getNewAnswer = (id: number) => {
    requests.getAnswer(id, (answerObj: AnswerT) => {
      setAnswer(answerObj.answer.split(''));
      setSynonym(answerObj.synonym);
    });
    setCurAnswerID(id);
  };

  useEffect(() => {
    getNewAnswer(1);
  }, []);

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
