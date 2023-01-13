export type GuessT = {
  guessID: number,
  guessWord: string[],
  guessed: boolean,
  correct: boolean,
  matched: number[],
};

export type GuessesT = GuessT[];

export type TileStyleT = {
  backgroundColor: string,
};

export type AnswerT = {
  answerID: number,
  answer: string,
  synonym: string,
};
