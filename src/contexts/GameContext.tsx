import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GameType = 'basic' | '2hg' | 'commander (edh)' | 'tiny leaders' | 'duel commander' | 'oauthbreaker';

export interface CommanderType {
    name?: string;
    playerId: string;
}

export interface CommanderDamageType {
    commander: CommanderType;
    damage: number;
}

export interface PlayerType {
    id: string;
    name: string;
    lifePoints: number;
    posionCounter: number;
    energyCounters: number;
    commanderDamage: CommanderDamageType[];
}

export interface GameInfo {
    gameType: GameType;
    numberOfPlayers: number;
    players: PlayerType[];
}

export interface GameContextType extends GameInfo {
    setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>;
    setGameType: React.Dispatch<React.SetStateAction<GameType>>;
    setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
    children: ReactNode;
    initialState: GameInfo | null;
}

const GameProvider = ({ children, initialState }: GameProviderProps) => {
    let defaultGameType: GameType = 'basic';
    let defaultNumberOfPlayers = 2;
    let defaultPlayers: PlayerType[] = [];

    if (initialState) {
        const {
            gameType: initialGameType,
            numberOfPlayers: initialNumberOfPlayers,
            players: initialPlayers,
        } = initialState;
        defaultGameType = initialGameType;
        defaultNumberOfPlayers = initialNumberOfPlayers;
        defaultPlayers = initialPlayers
    }

    const [gameType, setGameType] = useState<GameType>(defaultGameType);
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(defaultNumberOfPlayers);
    const [players, setPlayers] = useState<PlayerType[]>(defaultPlayers);

    return (
        <GameContext.Provider value={{
            players, setPlayers,
            gameType, setGameType,
            numberOfPlayers, setNumberOfPlayers
        }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame need to be used only inside a GameProvider');
    }
    return context;
}

export default GameProvider;