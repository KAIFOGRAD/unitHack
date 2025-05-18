import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../Button/PrimaryButton';
import styles from './PasswordSucces.module.scss';
import Succes from '../../../../assets/success.png'

export default function PasswordSucces() {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <img className={styles.image} src={Succes} alt="succes" />
            <h1 className={styles.title}>Пароль изменен</h1>
            <p className={styles.subtitle}>Ваш пароль был успешно изменен</p>
            <PrimaryButton onClick={handleLogin} text='Войти' />
        </div>  
    )
}