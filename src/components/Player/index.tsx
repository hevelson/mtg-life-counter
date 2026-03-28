import { useEffect, useState } from 'react';

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
    playerId: string;
}

enum lifeOperation {
    plus = '+',
    minus = '-',
}

const getLifeHistoryRegister = (oldLife: number, newLife: number) => {
    if (oldLife > newLife) {
        const difference = oldLife - newLife;
        return `${oldLife} (-${difference})`;
    }

    if (oldLife < newLife) {
        const difference = newLife - oldLife;
        return `${oldLife} (+${difference})`;
    }

    return false;
};

const playerNewLifeHistory = (player: PlayerType, newLifeTotal: number) => {
    const { lifePointsHistory } = player;
    const newHistoryLifeItem = getLifeHistoryRegister(player.lifePoints, newLifeTotal);
    const newLifePointsHistory = [...lifePointsHistory];

    if (newHistoryLifeItem) {
        newLifePointsHistory.push(newHistoryLifeItem);
    }

    const updatedPlayer: PlayerType = {
        ...player,
        lifePoints: newLifeTotal,
        lifePointsHistory: newLifePointsHistory
    };

    return updatedPlayer;
};

const Player = ({ player, playerId }: PlayerProps) => {
    const { setPlayers, gameType } = useGame();
    const [activeCounter, setActiveCounter] = useState<'life' | 'poison' | 'energy'>('life');
    const [activeTab, setActiveTab] = useState<'life-history' | 'general-damage'>('life-history');
    const [tempLifeAmount, setTempLifeAmount] = useState(player.lifePoints);

    const changeLife = (amount: number, operation: lifeOperation) => {
        if (operation === lifeOperation.plus) {
            setTempLifeAmount((prev) => prev + amount);
        } else {
            setTempLifeAmount((prev) => prev - amount);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setPlayers((prevPlayers) => {
                const current = prevPlayers.find(player => player.id === playerId);
                if (!current) return prevPlayers;

                if (current.lifePoints === tempLifeAmount) return prevPlayers;

                const updatedPlayer = playerNewLifeHistory(current, tempLifeAmount);

                const newPlayers = prevPlayers.map(prevPlayer => {
                    if (prevPlayer.id === current.id ) return updatedPlayer;
                    return prevPlayer;
                });

                return newPlayers;
            });
        }, 1500);

        return () => clearTimeout(timer);
    }, [tempLifeAmount, playerId, setPlayers]);

    const renderPlayerCounters = () => {
        return (
            <div className="player-counters">
                <div className="select-counter">
                    <button
                        type="button"
                        className={`${activeCounter === 'poison' && 'active'}`}
                        onClick={() => setActiveCounter('poison')}
                    >
                        <img src={PoisonIcon} alt="Poison counters" />
                        <span className={`${activeCounter === 'poison' && 'hide'}`}>{player.posionCounter}</span>
                    </button>
                    <button
                        type="button"
                        className={`${activeCounter === 'life' && 'active'}`}
                        onClick={() => setActiveCounter('life')}
                    >
                        <img src={HeartIcon} alt="Life" />
                        <span className={`${activeCounter === 'life' && 'hide'}`}>{player.lifePoints}</span>
                    </button>
                    <button
                        type="button"
                        className={`${activeCounter === 'energy' && 'active'}`}
                        onClick={() => setActiveCounter('energy')}
                    >
                        <img src={EnergyIcon} alt="Energy counters" />
                        <span className={`${activeCounter === 'energy' && 'hide'}`}>{player.energyCounters}</span>
                    </button>
                </div>
                <div className="active-counter">
                    <span className="commander-cast-counter">
                        <img src={CommandIcon} alt="commander cast counter" />
                    </span>
                    {tempLifeAmount}
                </div>
            </div>
        );
    };

    const renderNavHistory = () => {
        if (gameType === gameTypes.commander || gameType === gameTypes.duelcommander) {
            return (
                <nav className="history-tabs">
                    <button type="button" className={`tab-nav ${activeTab === 'general-damage' && ' active'}`} onClick={() => {setActiveTab('general-damage')}}>
                        Generals
                    </button>
                    <button type="button" className={`tab-nav ${activeTab === 'life-history' && ' active'}`} onClick={() => {setActiveTab('life-history')}}>
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
            const { lifePointsHistory } = player;
            return (
                <div className="life-history">
                    <ul>
                        {lifePointsHistory.map((item, key) => <li key={key}>{item}</li>)}
                        <li>{getLifeHistoryRegister(player.lifePoints, tempLifeAmount) || tempLifeAmount}</li>
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
                {renderPlayerCounters()}
            </header>
            <div>
                {renderNavHistory()}
                <div className="number-content">
                    {renderHistory()}
                </div>
            </div>
            <footer>
                <button type="button" onClick={() => changeLife(1, lifeOperation.minus)}>-1</button>
                <button type="button" onClick={() => changeLife(5, lifeOperation.minus)}>-5</button>
                <button type="button" onClick={() => changeLife(1, lifeOperation.plus)}>+1</button>
                <button type="button" onClick={() => changeLife(5, lifeOperation.plus)}>+5</button>
            </footer>
        </section>
    );
}

export default Player;