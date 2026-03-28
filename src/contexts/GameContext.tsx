import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import gameTypes from '../constants/gameTypes';
import { GameInfo } from '../types/game';
import { PlayerType } from '../types/player';
import { defaultPlayer } from '../constants/defaultPlayer';

export interface GameContextType extends GameInfo {
    gameUUID: string;
    setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>;
    setGameType: React.Dispatch<React.SetStateAction<gameTypes>>;
    setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
    setGameTypeAndPlayers: (newGameType: gameTypes, newTotalPlayers: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
    children: ReactNode;
    initialState: GameInfo | null;
}

const lifeTotalByGameType = (gameType: gameTypes): number => {
    switch (gameType) {
        case gameTypes.commander:
            return 40;
        case gameTypes.twohg:
        case gameTypes.duelcommander:
            return 30;
        case gameTypes.tinyleaders:
            return 25;
        default:
            return 20
    }
};

const GameProvider = ({ children, initialState }: GameProviderProps) => {
    let defaultGameId = uuidv4();
    let defaultGameType: gameTypes = gameTypes.basic;
    let defaultNumberOfPlayers = 2;
    let defaultPlayers: PlayerType[] = [];

    if (initialState) {
        const {
            id: initialGameId,
            gameType: initialGameType,
            numberOfPlayers: initialNumberOfPlayers,
            players: initialPlayers,
        } = initialState;
        defaultGameId = initialGameId || defaultGameId;
        defaultGameType = initialGameType;
        defaultNumberOfPlayers = initialNumberOfPlayers;
        defaultPlayers = initialPlayers;
    }

    const [gameUUID, setGameUUID] = useState<string>(defaultGameId);
    const [gameType, setGameType] = useState<gameTypes>(defaultGameType);
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(defaultNumberOfPlayers);
    const [players, setPlayers] = useState<PlayerType[]>(defaultPlayers);

    const setGameTypeAndPlayers = (newGameType: gameTypes, newTotalPlayers: number) => {
        let newPlayerList = [...players];
        if (newTotalPlayers > players.length) {
            for (let i = players.length; i < newTotalPlayers; i++) {
                const newPlayer = {
                    ...defaultPlayer,
                    id: uuidv4(),
                }
                newPlayerList.push(newPlayer);
            }
        }
    
        if (newTotalPlayers < players.length) {
            newPlayerList = players.slice(0, newTotalPlayers);
        }

        let newLifeTotal = lifeTotalByGameType(newGameType);

        newPlayerList = newPlayerList.map(player => {
            player.lifePoints = newLifeTotal;

            player.lifePointsHistory = [];
            return player;
        });

        setGameType(newGameType);
        setPlayers(newPlayerList);
        setGameUUID(uuidv4());
    };

    return (
        <GameContext.Provider value={{
            gameUUID,
            players, setPlayers,
            gameType, setGameType,
            numberOfPlayers, setNumberOfPlayers,
            setGameTypeAndPlayers,
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