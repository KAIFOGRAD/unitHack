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
    email: '',
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
    if (!formData.email || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login(formData.email, formData.password);
      localStorage.setItem('token', response.accessToken);
      navigate('/home');
    } catch (error) {
      setError('Неверный email или пароль');
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
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        placeholder="Введите адрес электронной почты"
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