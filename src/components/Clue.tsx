import React from 'react';
import '../styles/Clue.css';

type Props = {
  synonym: string,
  isCorrect: boolean,
  isValidWord: boolean
};

export default function Clue({ synonym, isCorrect, isValidWord }: Props): JSX.Element {
  if (isCorrect) {
    return (
      <h3 className="win">CORRECT!</h3>
    );
  }
  if (isValidWord) {
    return (
      <h3 className="synonymHeader">
        Similiar to...&nbsp;&nbsp;
        <span className="synonym">{synonym}</span>
      </h3>
    );
  }
  return (
    <h3 className="invalid-word">NOT A WORD!</h3>
  );
}
