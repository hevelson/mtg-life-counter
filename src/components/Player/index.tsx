import { useState } from 'react';

import { PlayerType } from '../../contexts/GameContext';
import HeartIcon from '../../images/heart-icon.svg';
import PoisonIcon from '../../images/poison-icon.svg';
import EnergyIcon from '../../images/energy-icon.svg';
import CommandIcon from '../../images/command-zone-icon-1.svg';
import './style.css';

interface PlayerProps {
    player: PlayerType;
}

const Player = ({ player }: PlayerProps) => {
    const [activeTab, setActiveTab] = useState('general-damage');

    const handleActiveTab = (tabName: string) => {
        setActiveTab(tabName);
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
                        <button>
                            <img src={PoisonIcon} alt="Poison counters" />
                            <span>0</span>
                        </button>
                        <button className="active">
                            <img src={HeartIcon} alt="Life" />
                        </button>
                        <button>
                            <img src={EnergyIcon} alt="Energy counters" />
                            <span>0</span>
                        </button>
                    </div>
                    <div className="active-counter">
                        <span className="commander-cast-counter">
                            <img src={CommandIcon} alt="commander cast counter" />
                        </span>
                        {40}
                    </div>
                </div>
            </header>
            <div>
                <nav className="history-tabs">
                    <button className={`tab-nav ${activeTab === 'general-damage' && ' active'}`} onClick={() => {handleActiveTab('general-damage')}}>
                        Generals
                    </button>
                    <button className={`tab-nav ${activeTab === 'life-history' && ' active'}`} onClick={() => {handleActiveTab('life-history')}}>
                        History
                    </button>
                </nav>
                <div className="number-content">
                    {renderHistory()}
                </div>
            </div>
            <footer>
                <button>-1</button>
                <button>-5</button>
                <button>+1</button>
                <button>+5</button>
            </footer>
        </section>
    );
}

export default Player;