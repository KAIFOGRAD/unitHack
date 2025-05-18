    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import FormInput from '../../FormInput/FormInput';
    import PrimaryButton from '../../Button/PrimaryButton';
    import styles from './LoginPage.module.scss';
    import VK from '../../../../assets/vk.svg'
    import Logo from '../../../../assets/logo.png'

    export default function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = () => {
        navigate('/home')
    };

    const hadleForgot = () => {
        navigate('/forgot-password')
    }

    return (
        <div className={styles.container}>
        <div className={styles.icon}>
            <img src={Logo} alt="star" />
        </div>

        <h1 className={styles.title}>Вход</h1>

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
            // placeholder="• • • • • • • •"
            placeholder='Введите пароль'
            onChange={handleChange}
        />

        <div className={styles.forgotPassword}>
            <button className={styles.link} onClick={hadleForgot}>Забыли пароль?</button>
        </div>

        <PrimaryButton text="Войти" onClick={handleLogin} />

        <div className={styles.or}>Или</div>

        <button className={styles.socialButton}>
            <img src={VK} alt="Google" className={styles.vk}/>
            Войти через ВКонтанке
        </button>
        </div>
    );
    }
