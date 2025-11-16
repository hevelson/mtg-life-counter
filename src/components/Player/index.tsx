import { useState } from 'react';

import { useGame } from '../../contexts/GameContext';
import gameTypes from '../../constants/gameTypes';
import { PlayerType } from '../../types/player';

import HeartIcon from '../../images/heart-icon.svg';
import PoisonIcon from '../../images/poison-icon.svg';
import EnergyIcon from '../../images/energy-icon.svg';
import CommandIcon from '../../images/command-zone-icon-1.svg';
import './style.css';

interface PlayerProps {
    player: PlayerType;
    playerKey: number;
}

const Player = ({ player, playerKey }: PlayerProps) => {
    const { players, setPlayers, gameType } = useGame();
    const [activeTab, setActiveTab] = useState('life-history');

    const handleActiveTab = (tabName: string) => {
        setActiveTab(tabName);
    };

    const setPlayerLife = (newLife: number) => {
        const player = players[playerKey];

        const updatedPlayer: PlayerType = {
            ...player,
            lifePoints: newLife
        };

        const updatePlayersList = players.map((player, key) => {
            if (key === playerKey) return updatedPlayer;
            return player;
        });

        setPlayers(updatePlayersList);
    };

    const increaseLife = (amount: number) => {
        const { lifePoints } = player;
        const newLife = lifePoints + amount;
        setPlayerLife(newLife);
    };

    const decreaseLife = (amount: number) => {
        const { lifePoints } = player;
        const newLife = lifePoints - amount;
        setPlayerLife(newLife);
    };

    const renderNavHistory = () => {
        if (gameType === gameTypes.commander || gameType === gameTypes.duelcommander) {
            return (
                <nav className="history-tabs">
                    <button type="button" className={`tab-nav ${activeTab === 'general-damage' && ' active'}`} onClick={() => {handleActiveTab('general-damage')}}>
                        Generals
                    </button>
                    <button type="button" className={`tab-nav ${activeTab === 'life-history' && ' active'}`} onClick={() => {handleActiveTab('life-history')}}>
                        History
                    </button>
                </nav>
            );
        }

        return null;
    };

    const renderHistory = () => {
        if (activeTab === 'general-damage') {
            return (
                <div className="generals-damage-counter">
                    <ul>
                        <li>
                            <span className="player-name">Me</span>
                            <span className="commander-damge">0</span>
                        </li>
                        <li>
                            <span className="player-name">Player 2</span>
                            <span className="commander-damge">0</span>
                        </li>
                        <li>
                            <span className="player-name">Player 3</span>
                            <span className="commander-damge">0</span>
                        </li>
                        <li>
                            <span className="player-name">Player 4</span>
                            <span className="commander-damge">0</span>
                        </li>
                    </ul>
                </div>
            );
        }

        if (activeTab === 'life-history') {
            return (
                <div className="life-history">
                    <ul>
                        <li>40(-5)</li>
                        <li>35(-2)</li>
                        <li>33(+1)</li>
                        <li>34(-8)</li>
                        <li>26</li>
                    </ul>
                </div>
            );
        }

        return null;
    }

    return (
        <section className="player-section">
            <header>
                <h2>{player.name}</h2>
                <div className="player-counters">
                    <div className="select-counter">
                        <button type="button">
                            <img src={PoisonIcon} alt="Poison counters" />
                            <span>0</span>
                        </button>
                        <button className="active">
                            <img src={HeartIcon} alt="Life" />
                        </button>
                        <button type="button">
                            <img src={EnergyIcon} alt="Energy counters" />
                            <span>0</span>
                        </button>
                    </div>
                    <div className="active-counter">
                        <span className="commander-cast-counter">
                            <img src={CommandIcon} alt="commander cast counter" />
                        </span>
                        {player.lifePoints}
                    </div>
                </div>
            </header>
            <div>
                {renderNavHistory()}
                <div className="number-content">
                    {renderHistory()}
                </div>
            </div>
            <footer>
                <button type="button" onClick={() => decreaseLife(1)}>-1</button>
                <button type="button" onClick={() => decreaseLife(5)}>-5</button>
                <button type="button" onClick={() => increaseLife(1)}>+1</button>
                <button type="button" onClick={() => increaseLife(5)}>+5</button>
            </footer>
        </section>
    );
}

export default Player;