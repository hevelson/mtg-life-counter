import gameTypes from '../constants/gameTypes';
import { PlayerType } from './player';

export interface GameInfo {
    gameType: gameTypes;
    numberOfPlayers: number;
    players: PlayerType[];
}
