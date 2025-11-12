import { GameInfo } from '../contexts/GameContext';
import { defaultPlayer } from './defaultPlayer';

const defaultGame: GameInfo = {
    gameType: 'basic',
    numberOfPlayers: 2,
    players: [defaultPlayer, defaultPlayer],
};

export default defaultGame;