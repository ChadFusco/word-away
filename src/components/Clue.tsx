import React from 'react';
import '../styles/Clue.css';

type Props = {
  synonym: string,
  isCorrect: boolean
};

export default function Clue({ synonym, isCorrect }: Props): JSX.Element {
  if (isCorrect) {
    return (
      <h3 className="win">CORRECT!</h3>
    );
  }
  return (
    <h3 className="synonymHeader">
      Similiar to...&nbsp;&nbsp;
      <span className="synonym">{synonym}</span>
    </h3>
  );
}
