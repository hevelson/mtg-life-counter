export interface CommanderType {
    name?: string;
    playerId: string;
}

export interface CommanderDamageType {
    commander: CommanderType;
    damage: number;
}
