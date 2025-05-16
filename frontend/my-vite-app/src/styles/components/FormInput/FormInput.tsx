import styles from './FormInput.module.scss';

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
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
            <input
                className={styles.input}
                type={type}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}
