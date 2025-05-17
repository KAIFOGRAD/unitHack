import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../Button/PrimaryButton';
import styles from './EmailVerification.module.scss';
import Star from '../../../../assets/Star.svg';
import Back from '../../../../assets/back.svg';

export default function EmailVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(['', '', '', '']); // 4 поля вместо 3
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

    // Автофокус на первом поле
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (/^\d*$/.test(value)) { // Разрешаем только цифры
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Автопереход к следующему полю
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            // Переход к предыдущему полю при Backspace
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
        const newCode = [...code];
        pasteData.split('').forEach((char, i) => {
            if (i < 4) newCode[i] = char;
        });
        setCode(newCode);
    };

    const handleDigitInput = (digit: string) => {
        const emptyIndex = code.findIndex(val => val === '');
        if (emptyIndex !== -1) {
            const newCode = [...code];
            newCode[emptyIndex] = digit;
            setCode(newCode);
            if (emptyIndex < 3) {
                inputRefs.current[emptyIndex + 1]?.focus();
            }
        }
    };

    const handleDelete = () => {
        const lastFilledIndex = code.reduce((acc, val, idx) => val !== '' ? idx : acc, -1);
        if (lastFilledIndex !== -1) {
            const newCode = [...code];
            newCode[lastFilledIndex] = '';
            setCode(newCode);
            inputRefs.current[lastFilledIndex]?.focus();
        } else if (code[0] === '') {
            inputRefs.current[0]?.focus();
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
            setTimer(59);
            // Логика повторной отправки кода
        }
    };

    const handleVerification = () => {
        if (code.every(digit => digit !== '')) {
            navigate('/password-reset', { state: { email } });
        }
    };

    const handleForgot = () => {
        navigate('/forgot-password');
    };

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
                Мы отправили письмо на <span className={styles.email}>{email}</span>
            </p>

            <div className={styles.codeInputs}>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el: HTMLInputElement | null) => {
                            inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className={styles.codeInput}
                        autoFocus={index === 0}
                    />
                ))}
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
                Отправить код повторно <span className={styles.timer}>{timer > 0 ? `0:${timer.toString().padStart(2, '0')}` : ''}</span>
            </button>

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

            
        </div>
    );
}