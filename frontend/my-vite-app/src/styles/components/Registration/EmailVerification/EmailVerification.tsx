import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../../../api/auth';
import PrimaryButton from '../../Button/PrimaryButton';
import PasswordHeader from '../PasswordHeader/PasswordHeader';
import styles from './EmailVerification.module.scss';

export default function EmailVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']); // 6 полей вместо 4
    const [timer, setTimer] = useState(59);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            navigate('/forgot-password');
        }
    }, [location, navigate]);

    useEffect(() => {
        const interval = timer > 0 ? setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000) : undefined;

        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (/^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            setError('');

            // Переход к следующему полю при вводе цифры
            if (value && index < 5) { // Изменили с 3 на 5 для 6 полей
                inputRefs.current[index + 1]?.focus();
            }
            
            // Автоматическая отправка при заполнении всех полей
            if (newCode.every(digit => digit !== '')) {
                handleVerification();
            }
        }
    };

    const handleVerification = async () => {
        if (!code.every(digit => digit !== '')) {
            setError('Введите полный код');
            return;
        }

        try {
            setLoading(true);
            const verificationCode = code.join('');
            await authApi.verifyEmail({ email, code: verificationCode });

            if (location.state?.fromRegister) {
                navigate('/home');
            } else {
                navigate('/password-reset', { state: { email } });
            }
        } catch (error) {
            setError('Неверный код подтверждения');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (timer > 0) return;

        try {
            console.log("Attempting to resend code to:", email);
            await authApi.resendCode({ email });
            console.log("Resend code request successful");
            setTimer(59);
            setError('');
        } catch (error) {
            console.error("Error resending code:", error);
            setError('Ошибка при отправке кода');
        }
    };

    const isCodeComplete = code.every(digit => digit !== '');

    return (
        <div className={styles.container}>
            <PasswordHeader />
            <h1 className={styles.title}>Проверьте почту</h1>
            <p className={styles.subtitle}>
                Мы отправили письмо на <span className={styles.email}>{email}</span>
            </p>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.codeInputs}>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => {
                            // Обработка удаления - переход к предыдущему полю
                            if (e.key === 'Backspace' && !digit && index > 0) {
                                inputRefs.current[index - 1]?.focus();
                            }
                        }}
                        className={styles.codeInput}
                        autoFocus={index === 0}
                    />
                ))}
            </div>

            <PrimaryButton
                text={loading ? 'Проверка...' : 'Подтвердить'}
                onClick={handleVerification}
                disabled={!isCodeComplete || loading}
                className={styles.submitButton}
            />

            <button
                className={`${styles.resendButton} ${timer > 0 ? styles.disabled : ''}`}
                onClick={handleResendCode}
                disabled={timer > 0}
            >
                Отправить код повторно {timer > 0 && `(0:${timer.toString().padStart(2, '0')})`}
            </button>
        </div>
    );
}