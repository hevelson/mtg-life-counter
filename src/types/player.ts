import { CommanderDamageType } from './commander';

export interface PlayerType {
    id: string;
    name: string;
    lifePoints: number;
    lifePointsHistory: string[];
    posionCounter: number;
    energyCounters: number;
    commanderDamage: CommanderDamageType[];
}
