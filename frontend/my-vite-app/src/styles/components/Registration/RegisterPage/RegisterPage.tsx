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
        username: '', // Changed from login to match backend
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = async () => {
        try {
            setLoading(true);
            setError('');

            await authApi.register({
                email: formData.email,
                username: formData.username,
                password: formData.password
            });

            navigate('/email-verification', {
                state: { email: formData.email }
            });
        } catch (error: any) {
            console.error('Registration error:', error);
            if (error.response && error.response.status === 400) {
                setError('Пользователь с таким именем уже существует. Пожалуйста, выберите другое имя.');
            } else {
                setError(error.message || 'Registration failed. Please try again.');
            }
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
                <img src={Logo} alt="star" />
            </div>
            <h1 className={styles.title}>Регистрация</h1>

            {error && <div className={styles.error}>{error}</div>}

            <FormInput
                label="Username" // Changed from Логин
                type="text"
                name="username" // Changed from login
                value={formData.username}
                placeholder="Enter username"
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
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleChange}
            />

            <PrimaryButton
                text={loading ? 'Registering...' : 'Create Account'}
                onClick={handleRegister}
                disabled={loading}
                className={styles.button}
            />

            <div className={styles.login_container}>
                <p className={styles.login_text}>Already have an account?</p>
                <a className={styles.login_link} onClick={handleLogin}>Login</a>
            </div>
        </div>
    );
}