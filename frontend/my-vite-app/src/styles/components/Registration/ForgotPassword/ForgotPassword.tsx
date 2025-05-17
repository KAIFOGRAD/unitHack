import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../FormInput/FormInput';
import PrimaryButton from '../../Button/PrimaryButton';
import styles from './ForgotPassword.module.scss';
import Star from '../../../../assets/Star.svg';
import Back from '../../../../assets/back.svg';

export default function ForgotPassword() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSendCode = () => {
        navigate('/password-recovery')
    }

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={handleLogin} className={styles.back}>
                    <img className={styles.back_img} src={Back} alt="Назад" />
                </button>
                <div className={styles.icon}>
                    <img src={Star} alt="star" />
                </div>
            </div>
            <h1 className={styles.title}>Забыли пароль?</h1>
            <p className={styles.subtitle}>Не переживайте. Мы оправим письмо для сброса пароля.</p>

            <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Введите адрес электронной почты"
                onChange={handleChange}
            />

            <PrimaryButton className={styles.button} text='Отправить код' onClick={handleSendCode}/>

            <div className={styles.forgot_container}>
            <p className={styles.forgot_text}>Вспомнили пароль?</p>
            <a className={styles.forgot_link} onClick={handleLogin}>Войти</a>
        </div>
        </div>
    )

}