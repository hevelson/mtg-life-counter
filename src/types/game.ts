import gameTypes from '../constants/gameTypes';
import { PlayerType } from './player';

export interface GameInfo {
    id?: string;
    gameType: gameTypes;
    numberOfPlayers: number;
    players: PlayerType[];
}
