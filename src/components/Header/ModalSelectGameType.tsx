import { useState } from 'react';
import Modal from 'react-modal';
import gameTypes from '../../constants/gameTypes';
import { useGame } from '../../contexts/GameContext';

interface ModalSelectGameTypeProps {
    modalIsOpen: boolean;
    closeModal: () => void;
}

const ModalSelectGameType = ({ modalIsOpen, closeModal }: ModalSelectGameTypeProps) => {
    const { gameType, setGameTypeAndPlayers } = useGame();
    const [selectedGameType, setSelectedGameType] = useState(gameType);
    const [selectedTotalPlayers, setSelectedTotalPlayers] = useState(2);

    const handleGameSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = e.target.value as gameTypes;
        setSelectedGameType(value);
    };

    const handlePLayersSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const value = e.target.value;
        setSelectedTotalPlayers(parseInt(value));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGameTypeAndPlayers(selectedGameType, selectedTotalPlayers);
        closeModal();
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal-select-game-type"
            overlayClassName="modal-overlay">
            <h2>Select the game type <br />and the total players</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="select-game-type">Game type</label>
                <select id="select-game-type" onChange={handleGameSelect} value={selectedGameType}>
                    <option value={gameTypes.basic}>{gameTypes.basic}</option>
                    <option value={gameTypes.twohg}>{gameTypes.twohg}</option>
                    <option value={gameTypes.commander}>{gameTypes.commander}</option>
                    <option value={gameTypes.tinyleaders}>{gameTypes.tinyleaders}</option>
                    <option value={gameTypes.duelcommander}>{gameTypes.duelcommander}</option>
                    <option value={gameTypes.oauthbreake}>{gameTypes.oauthbreake}</option>
                </select>
                <label htmlFor="select-total-players">Number of players</label>
                <select id="select-total-players" onChange={handlePLayersSelect} value={selectedTotalPlayers}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                <footer>
                    <button type="submit" className="btn-default">Ok</button>
                    <button type="button" onClick={closeModal} className="btn-default">Cancel</button>
                </footer>
            </form>
        </Modal>
    );
};

export default ModalSelectGameType;
