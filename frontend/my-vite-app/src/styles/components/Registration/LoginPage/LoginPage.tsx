import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../../../api/auth';
import FormInput from '../../FormInput/FormInput';
import PrimaryButton from '../../Button/PrimaryButton';
import styles from './LoginPage.module.scss';
import VK from '../../../../assets/vk.svg';
import Star from '../../../../assets/Star.svg';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', // Change from email to username
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(formData); // Use username instead of email
      localStorage.setItem('token', response.accessToken);
      navigate('/home');
    } catch (error) {
      setError('Неверный логин или пароль'); // Update error message
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = () => {
    navigate('/forgot-password');
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={Star} alt="star" />
      </div>

      <h1 className={styles.title}>Вход</h1>

      {error && <div className={styles.error}>{error}</div>}

      <FormInput
        label="Логин" // Change label from Email to Username
        type="text" // Change type to text for username
        name="username" // Update name to username
        value={formData.username} // Bind to username
        placeholder="Введите логин" // Update placeholder
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

      <div className={styles.forgotPassword}>
        <button className={styles.link} onClick={handleForgot}>Забыли пароль?</button>
      </div>

      <PrimaryButton 
        text={loading ? 'Вход...' : 'Войти'} 
        onClick={handleLogin} 
        disabled={loading}
      />

      <div className={styles.or}>Или</div>

      <button className={styles.socialButton}>
        <img src={VK} alt="VK" className={styles.vk}/>
        Войти через ВКонтакте
      </button>
    </div>
  );
}
