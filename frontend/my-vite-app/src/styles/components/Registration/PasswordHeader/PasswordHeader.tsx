import React from 'react';
import styles from './PasswordHeader.module.scss';
import Back from '../../../../assets/back.svg';
import Star from '../../../../assets/Star.svg';

interface PasswordHeaderProps {
    onBackClick: () => void;
}

const PasswordHeader: React.FC<PasswordHeaderProps> = ({ onBackClick }) => {
    return (
        <div className={styles.header}>
            <button onClick={onBackClick} className={styles.back}>
                <img className={styles.back_img} src={Back} alt="Назад" />
            </button>
            <div className={styles.icon}>
                <img src={Star} alt="star" />
            </div>
        </div>
    );
};

export default PasswordHeader;