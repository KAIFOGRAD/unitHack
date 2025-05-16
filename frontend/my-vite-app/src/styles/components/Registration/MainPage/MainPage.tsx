import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';
import image from '../../../../assets/Illustration.png'
import PrimaryButton from '../../Button/PrimaryButton';
export default function MainPage() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.logoWrapper}>
                <img src={image} alt="Logo" className={styles.logo} />
            </div>

            <h1 className={styles.title}>Name project</h1>
            <p className={styles.subtitle}>Все мероприятия в одном месте</p>

            <div className={styles.buttonGroup}>
                <PrimaryButton text='Войти' onClick={() => navigate('/login')} />
                <button className={styles.secondaryButton} onClick={() => navigate('/register')}>Создать аккаунт</button>
            </div>
        </div>
    );
}
