export type GuessT = {
  guessID: number,
  guessWord: string[],
  guessed: boolean,
  matched: number[],
};

export type GuessesT = GuessT[];

export type TileStyleT = {
  backgroundColor: string,
};
