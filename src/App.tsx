import React from 'react';
import './App.css';
import Header from './components/Header';
import Player from './components/Player';
import GameProvider from './contexts/GameContext';
import defaultGame from './constants/defaultGame';
import PlayersList from './components/PlayersList';

const App = () => {
    return (
        <GameProvider initialState={defaultGame}>
            <div className="mtg-life-counter-app">
                <Header />
                <PlayersList />
            </div>
        </GameProvider>
    );
}

export default App;
