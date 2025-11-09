import React from 'react';
import './App.css';
import Header from './components/Header';
import Player from './components/Player';

function App() {
  return (
    <div className="mtg-life-counter-app">
      <Header />
      <section className="players-list">
        <Player />
        <Player />
      </section>
    </div>
  );
}

export default App;
