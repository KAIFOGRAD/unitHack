import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../FormInput/FormInput';
import PrimaryButton from '../../Button/PrimaryButton';
import PasswordHeader from '../PasswordHeader/PasswordHeader';
import styles from './PasswordReset.module.scss';


export default function PasswordReset() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        password: '',
        newPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleBack = () => {
        navigate('/email-verification')
    }

    const handleSucces = () => {
        navigate('/password-succes')

        if (formData.password !== formData.newPassword) {
            setError('Пароли не совпадают');
            return;
        }
        
        if (formData.password.length < 8) {
            setError('Пароль должен содержать минимум 8 символов');
            return;
        }
    }

    return (
        <div className={styles.container}>
            <PasswordHeader />
            <h1 className={styles.title}>Восстановление пароля</h1>

            <FormInput
                        label="Новый пароль"
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder='Должно быть не менее 8 символов'
                        onChange={handleChange}
                    />
            
            <FormInput
                        label="Подтвердите новый пароль"
                        type="password"
                        name="new password"
                        value={formData.password}
                        placeholder='Подтвердите пароль'
                        onChange={handleChange}
                    />

            <PrimaryButton className={styles.button} onClick={handleSucces} text='Сбросить пароль' />

        </div>
    )
}