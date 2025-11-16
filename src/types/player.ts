import { CommanderDamageType } from './commander';

export interface PlayerType {
    id: string;
    name: string;
    lifePoints: number;
    lifePointsHistory: number[];
    posionCounter: number;
    energyCounters: number;
    commanderDamage: CommanderDamageType[];
}
