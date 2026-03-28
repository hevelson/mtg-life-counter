import { useGame } from "../contexts/GameContext";
import Player from "./Player";

const PlayersList = () => {
    const { gameUUID, players } = useGame();
    return (
        <section className="players-list">
            {players.map((player) => <Player player={player} playerId={player.id} key={`${player.id}-${gameUUID}`} />)}
        </section>
    );
};

export default PlayersList;