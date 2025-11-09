import { useState } from 'react';

import './style.css';
import DiceIcon from '../../images/dice-icon.svg';
import ManaIcon from '../../images/mana-icon.svg';
import ResetIcon from '../../images/vertical-dots-icon.svg';

const Header = () => {
    const [format] = useState('Commander (EDH)');
    const [players] = useState(4);

    return (
        <header className="top-bar-header">
            <button className="button-menu">
                <span className="menu-icon">Menu</span>
            </button>
            <button className="button-select-format">
                {`${format} - ${players} Players`}
            </button>
            <button className="button-roll-dice">
                <img src={DiceIcon} alt="roll dice" />
            </button>
            <button className="button-new-game">
                <img src={ManaIcon} alt="new game" />
            </button>
            <button className="button-reset-game">
                <img src={ResetIcon} alt="reset game" />
            </button>
        </header>
    );
};

export default Header;