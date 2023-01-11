import React from 'react';
import '../styles/App.css';
import Guess from './Guess';

export default function App(): JSX.Element {
  return (
    <div className="app">
      <div className="app-header">
        <h2>A Word Away...</h2>
      </div>
      <Guess />
    </div>
  );
}
