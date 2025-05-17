    import React, {useState} from "react";
    import styles from './AppFooter.module.scss';
    import {useNavigate } from 'react-router-dom';
    import HomeIcon from '../../../assets/home.svg';
    import CalendarIcon from '../../../assets/calendar.svg';
    import ProfileIcon from '../../../assets/user.svg';
    
    export default function AppFooter() {
        const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');

    const handleClick = (tab: string) => {
        setActiveTab(tab);
        navigate(`/${tab}`);
    };

    return (
        <footer className={styles.footer}>
        <div className={styles.buttons}>
            <button 
            onClick={() => handleClick('home')}
            className={`${styles.button} ${activeTab === 'home' ? styles.active : ''}`}
            >
            <img src={HomeIcon} alt="Главная" className={styles.icon} />
            <span>Главная</span>
            </button>

            <button 
            onClick={() => handleClick('calendar')}
            className={`${styles.button} ${activeTab === 'calendar' ? styles.active : ''}`}
            >
            <img src={CalendarIcon} alt="Календарь" className={styles.icon} />
            <span>Календарь</span>
            </button>

            <button 
            onClick={() => handleClick('profile')}
            className={`${styles.button} ${activeTab === 'profile' ? styles.active : ''}`}
            >
            <img src={ProfileIcon} alt="Профиль" className={styles.icon} />
            <span>Профиль</span>
            </button>
        </div>
        </footer>
    );
    }