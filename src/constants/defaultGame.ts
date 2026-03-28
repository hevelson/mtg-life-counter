import { GameInfo } from '../types/game';
import { defaultPlayer } from './defaultPlayer';
import gameTypes from './gameTypes';

const defaultGame: GameInfo = {
    gameType: gameTypes.basic,
    numberOfPlayers: 2,
    players: [
        { ...defaultPlayer, id: 'player-one', name: 'You' },
        { ...defaultPlayer, id: 'player-two', name: 'Opponent' },
    ],
};

export default defaultGame;