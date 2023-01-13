import React, { useState, ReactElement } from 'react';
import '../styles/App.css';
import Guess from './Guess';
import Clue from './Clue';
// import requests from '../requests';
import answers from '../data';
import type { GuessesT, GuessT } from '../dataStructure';

export default function App(): JSX.Element {
  // initialize "guesses" state on page load
  const initialStrArr: string[] = ['', '', '', '', '', ''];
  const initialNumArr: number[] = [0, 0, 0, 0, 0, 0];
  const initialGuess: GuessT = {
    guessID: 0,
    guessWord: initialStrArr,
    guessed: false,
    correct: false,
    matched: initialNumArr,
  };
  const initialGuesses: GuessesT = [initialGuess];
  for (let i = 1; i < 5; i += 1) {
    initialGuesses.push({ ...initialGuess, guessID: i });
  }

  // COMPONENT STATES
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<GuessesT>(initialGuesses);
  const [curAnswerID, setCurAnswerID] = useState<number>(0);
  const [answer, setAnswer] = useState<string[]>(answers[0].answer.toUpperCase().split(''));
  const [synonym, setSynonym] = useState<string>(answers[0].synonym);

  function timeout(delay: number) {
    return new Promise((res) => { setTimeout(res, delay); });
  }

  const clearBoard = () => {
    setGuesses(initialGuesses);
  };

  const getNewAnswer = (answerID: number) => {
    setAnswer(answers[answerID + 1].answer.toUpperCase().split(''));
    setSynonym(answers[answerID + 1].synonym);
    setCurAnswerID(answerID + 1);
  };

  const checkAnswer = async (submittedGuess: GuessT) => {
    const newMatchedArr: number[] = submittedGuess.guessWord.map((char: string, i: number) => {
      if (answer.indexOf(char) === -1) {
        return 0;
      }
      return (char === answer[i] ? 2 : 1);
    });

    const isCorrectGuess: boolean = newMatchedArr.reduce((acc, num) => acc + num) === 12;
    setIsCorrect(isCorrectGuess);

    const newGuess = {
      ...submittedGuess, guessed: true, correct: isCorrectGuess, matched: newMatchedArr,
    };

    setGuesses((prevGuesses: GuessesT) => prevGuesses.map((guessItem: GuessT) => (
      guessItem.guessID === newGuess.guessID ? newGuess : guessItem
    )));

    if (isCorrectGuess) {
      await timeout(2500);
      getNewAnswer(curAnswerID);
      clearBoard();
      setIsCorrect(false);
    }
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
      <Clue synonym={synonym} isCorrect={isCorrect} />
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
