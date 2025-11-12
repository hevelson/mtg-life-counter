import { PlayerType } from '../contexts/GameContext';

export const defaultPlayer: PlayerType = {
    id: 'default',
    name: 'Default',
    lifePoints: 20,
    posionCounter: 0,
    energyCounters: 0,
    commanderDamage: [],
};
