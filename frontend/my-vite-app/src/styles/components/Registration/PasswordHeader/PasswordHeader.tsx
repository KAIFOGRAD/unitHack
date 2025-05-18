import React from 'react';
import styles from './PasswordHeader.module.scss';
import Back from '../../../../assets/back.svg';
import { useNavigate } from 'react-router-dom';
import Star from '../../../../assets/Star.svg';

const PasswordHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    };
    return (
        <div className={styles.header}>
            <button onClick={handleBackClick} className={styles.back}>
                <img className={styles.back_img} src={Back} alt="Назад" />
            </button>
            <div className={styles.icon}>
                <img src={Star} alt="star" />
            </div>
        </div>
    );
};

export default PasswordHeader;