import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../FormInput/FormInput';
import PrimaryButton from '../../Button/PrimaryButton';
import PasswordHeader from '../PasswordHeader/PasswordHeader';
import styles from './ForgotPassword.module.scss';

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
        if (!formData.email) {
           //сообщение что email нет или он невалиден
        }
        navigate('/email-verification', { 
            state: { email: formData.email } 
        });
    }

    const handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <PasswordHeader />
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