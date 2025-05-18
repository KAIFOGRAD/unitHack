import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../api/auth';
import FormInput from '../../FormInput/FormInput';
import PrimaryButton from '../../Button/PrimaryButton';
import styles from './RegisterPage.module.scss';
import Star from '../../../../assets/Star.svg';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        login: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        if (!formData.email || !formData.login || !formData.password) {
            setError('Заполните все поля');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await authApi.register(formData);

            navigate('/email-verification', {
                state: {
                    email: formData.email,
                    fromRegister: true,
                },
            });
        } catch (error) {
            setError('Ошибка регистрации. Возможно, email уже используется');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <img src={Star} alt="star" />
            </div>
            <h1 className={styles.title}>Регистрация</h1>

            {error && <div className={styles.error}>{error}</div>}

            <FormInput
                label="Логин"
                type="text"
                name="login"
                value={formData.login}
                placeholder="Введите логин"
                onChange={handleChange}
            />

            <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="your@email.com"
                onChange={handleChange}
            />

            <FormInput
                label="Пароль"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Введите пароль"
                onChange={handleChange}
            />

            <PrimaryButton
                text={loading ? 'Регистрация...' : 'Создать аккаунт'}
                onClick={handleRegister}
                disabled={loading}
                className={styles.button}
            />

            <div className={styles.login_container}>
                <p className={styles.login_text}>Есть аккаунт?</p>
                <a className={styles.login_link} onClick={handleLogin}>Войти</a>
            </div>
        </div>
    );
}