import { useGame } from "../contexts/GameContext";
import Player from "./Player";

const PlayersList = () => {
    const { players } = useGame();
    return (
        <section className="players-list">
            {players.map((player, key) => <Player player={player} key={key} />)}
        </section>
    );
};

export default PlayersList;