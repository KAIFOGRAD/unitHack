import styles from './FormInput.module.scss';
import EyeOff from '../../../assets/eye-off.svg';
import EyeOn from '../../../assets/eye.svg';
import { useState } from 'react';

interface FormInputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
    label,
    type,
    name,
    value,
    placeholder,
    onChange,
}: FormInputProps) {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <div className={styles.inputContainer}>
                <input
                className={styles.input}
                type={inputType}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {type === 'password' && (
                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={togglePasswordVisibility}
                    >
                        <img 
                            src={showPassword ? EyeOn : EyeOff} 
                            alt={showPassword ? "Hide password" : "Show password"} 
                            className={styles.eyeIcon}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
