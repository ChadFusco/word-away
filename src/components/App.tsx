import React, { useState, ReactElement } from 'react';
import '../styles/App.css';
import axios from 'axios';
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
    valid: true,
    correct: false,
    matched: initialNumArr,
  };
  const initialGuesses: GuessesT = [initialGuess];
  for (let i = 1; i < 5; i += 1) {
    initialGuesses.push({ ...initialGuess, guessID: i });
  }

  // COMPONENT STATES
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isValidWord, setIsValidWord] = useState<boolean>(true);
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

  const updateGuess = (guessID: number, newGuess: GuessT) => {
    setGuesses((prevGuesses: GuessesT) => prevGuesses.map((guessItem: GuessT) => (
      guessItem.guessID === guessID ? newGuess : guessItem
    )));
  };

  const checkAnswer = async (submittedGuess: GuessT) => {
    // check if answer is a word:
    const dictUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    axios.get(`${dictUrl}${submittedGuess.guessWord.join('')}`)
      .then(({ data }) => (data.word ? 'valid word' : new Error('guess is a not a word')))
      .then(async () => {
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

        updateGuess(submittedGuess.guessID, newGuess);

        if (isCorrectGuess) {
          await timeout(3000);
          getNewAnswer(curAnswerID);
          clearBoard();
          setIsCorrect(false);
        }
      })
      .catch(async () => {
        // clear out guess
        const newGuess = { ...submittedGuess, valid: false };
        updateGuess(submittedGuess.guessID, newGuess);
        // notify user that it's not a word
        setIsValidWord(false);
        await timeout(2500);
        updateGuess(submittedGuess.guessID, initialGuess);
        setIsValidWord(true);
      });
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
      <Clue synonym={synonym} isCorrect={isCorrect} isValidWord={isValidWord} />
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
