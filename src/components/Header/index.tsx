import { useState } from 'react';

import './style.css';
import DiceIcon from '../../images/dice-icon.svg';
import ManaIcon from '../../images/mana-icon.svg';
import ResetIcon from '../../images/vertical-dots-icon.svg';
import ModalSelectGameType from './ModalSelectGameType';
import { useGame } from '../../contexts/GameContext';

const Header = () => {
    const { gameType, numberOfPlayers } = useGame();
    const [modalGameIsOpen, setModalGameIsOpen] = useState(false);

    const closeModalGame = () => {
        setModalGameIsOpen(false);
    };

    return (
        <header className="top-bar-header">
            <button type="button" className="button-menu">
                <span className="menu-icon">Menu</span>
            </button>
            <button type="button" onClick={() => { setModalGameIsOpen(true) }} className="button-select-format">
                {`${gameType} - ${numberOfPlayers} Players`}
            </button>
            <button type="button" className="button-roll-dice">
                <img src={DiceIcon} alt="roll dice" />
            </button>
            <button type="button" className="button-new-game">
                <img src={ManaIcon} alt="new game" />
            </button>
            <button type="button" className="button-reset-game">
                <img src={ResetIcon} alt="reset game" />
            </button>
            <ModalSelectGameType modalIsOpen={modalGameIsOpen} closeModal={closeModalGame} />
        </header>
    );
};

export default Header;