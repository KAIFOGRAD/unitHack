import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../Button/PrimaryButton';
import styles from './EmailVerification.module.scss';
import Star from '../../../../assets/Star.svg';
import Back from '../../../../assets/back.svg';

export default function EmailVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(['', '', '']);
    const [timer, setTimer] = useState(59);
    const [email, setEmail] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            navigate('/forgot-password');
        }
    }, [location]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleDigitInput = (digit: string) => {
        const emptyIndex = code.findIndex(val => val === '');
        if (emptyIndex !== -1) {
            const newCode = [...code];
            newCode[emptyIndex] = digit;
            setCode(newCode);
        }
    };

    const handleDelete = () => {
        const lastFilledIndex = code.reduce((acc, val, idx) => val !== '' ? idx : acc, -1);
        if (lastFilledIndex !== -1) {
            const newCode = [...code];
            newCode[lastFilledIndex] = '';
            setCode(newCode);
        }
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleResendCode = () => {
        if (timer === 0) {
            setTimer(20);
            // воткнуть логику повторной отправки кода
        }
    };

    const handleVerification = () => {
        if (code.every(digit => digit !== '')) {
            navigate('/password-reset', { state: { email } });
        }
    };

    const handleForgot = () => {
        navigate('/forgot-password')
    }

    const isCodeComplete = code.every(digit => digit !== '');

    return (
        <div className={styles.container}>
                <div className={styles.header}>
                <button onClick={handleForgot} className={styles.back}>
                    <img className={styles.back_img} src={Back} alt="Назад" />
                </button>
                <div className={styles.icon}>
                    <img src={Star} alt="star" />
                </div>
            </div>
            <h1 className={styles.title}>Проверьте почту</h1>
            <p className={styles.subtitle}>
                Мы отправили письмо на <p className={styles.email}>{email}</p>
            </p>

            <div className={styles.codeDisplay}>
                {code.map((digit, index) => (
                    <div key={index} className={styles.digitBox}>
                        {digit || <span className={styles.placeholder}>•</span>}
                    </div>
                ))}
            </div>

            <div className={styles.keyboard}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button 
                        key={num} 
                        className={styles.key}
                        onClick={() => handleDigitInput(num.toString())}
                    >
                        {num}
                    </button>
                ))}
                <div className={styles.emptyKey}></div>
                <button 
                    className={styles.key}
                    onClick={() => handleDigitInput('0')}
                >
                    0
                </button>
                <button 
                    className={styles.deleteKey}
                    onClick={handleDelete}
                >
                    ⌫
                </button>
            </div>

            <PrimaryButton
                text="Подтвердить"
                onClick={handleVerification}
                className={styles.submitButton}
            />

            <button 
                className={styles.resendButton} 
                onClick={handleResendCode}
                disabled={timer > 0}
            >
                Отправить код повторно {timer > 0 ? `0:${timer.toString().padStart(2, '0')}` : ''}
            </button>
        </div>
    );
}