import React, { useState, ReactElement, createContext } from 'react';
import '../styles/App.css';
import Guess from './Guess';
// import requests from '../requests';
import answers from '../data';
import type { GuessesT, GuessT } from '../dataStructure';

// const AnswerContext = createContext();

export default function App(): JSX.Element {
  // initialize "guesses" state on page load
  const initialStrArr: string[] = ['', '', '', '', '', ''];
  const initialNumArr: number[] = [0, 0, 0, 0, 0, 0];
  const initialGuess: GuessT = {
    guessID: 0,
    guessWord: initialStrArr,
    guessed: false,
    matched: initialNumArr,
  };
  const initialGuesses: GuessesT = [initialGuess];
  for (let i = 1; i < 5; i += 1) {
    initialGuesses.push({ ...initialGuess, guessID: i });
  }

  // COMPONENT STATES
  const [guesses, setGuesses] = useState<GuessesT>(initialGuesses);
  const [curAnswerID, setCurAnswerID] = useState<number>(1);
  const [answer, setAnswer] = useState<string[]>(answers[1].answer.toUpperCase().split(''));
  const [synonym, setSynonym] = useState<string>(answers[1].synonym);

  const getNewAnswer = (answerID: number) => {
    setAnswer(answers[answerID - 1].answer.toUpperCase().split(''));
    setSynonym(answers[answerID - 1].synonym);
    setCurAnswerID(answerID);
  };

  const clearBoard = () => {
    setGuesses(initialGuesses);
  };

  const checkAnswer = (submittedGuess: GuessT) => {
    const newMatchedArr: number[] = submittedGuess.guessWord.map((char: string, i: number) => {
      if (answer.indexOf(char) === -1) {
        return 0;
      }
      return (char === answer[i] ? 2 : 1);
    });
    if (newMatchedArr.reduce((acc, num) => acc + num) === 12) {
      clearBoard();
      getNewAnswer(curAnswerID);
    }

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
