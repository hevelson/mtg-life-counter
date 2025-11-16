import React from 'react';
import './App.css';
import Header from './components/Header';
import GameProvider from './contexts/GameContext';
import defaultGame from './constants/defaultGame';
import PlayersList from './components/PlayersList';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

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
