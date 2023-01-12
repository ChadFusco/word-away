import React, { useState, ReactElement, useEffect } from 'react';
import '../styles/App.css';
import Guess from './Guess';
import requests from '../requests';
import answers from '../answers';
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
  const [answer, setAnswer] = useState<string[]>(answers[1].answer.toUpperCase().split(''));
  const [synonym, setSynonym] = useState<string>(answers[1].synonym);

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

  // const getNewAnswer = (answerID: number) => {
  //   requests.getAnswer(answerID, (answerObj: AnswerT) => {
  //     setAnswer(answerObj.answer.split(''));
  //     setSynonym(answerObj.synonym);
  //   });
  //   setCurAnswerID(answerID);
  // };

  const getNewAnswer = (answerID: number) => {
    requests.getAnswer(answerID, (answerObj: AnswerT) => {
      setAnswer(answerObj.answer.toUpperCase().split(''));
      setSynonym(answerObj.synonym);
    });
    setCurAnswerID(answerID);
  };

  // useEffect(() => {
  //   getNewAnswer(1);
  // }, []);

  // console.log(guesses);

  return (
    <div className="app">
      <div className="app-header">
        <h2>A Word Away...</h2>
      </div>
      <h3 className="synonymHeader">
        Similiar to...&nbsp;&nbsp;
        <span className="synonym">{synonym}</span>
      </h3>
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
