import React from 'react';
import styles from './InputComponents.module.css'; // CSS Module

interface NumberInputProps {
    id: string;
    label: string;
    value: number | '';
    onChange: (value: number | '') => void;
    onBlur: () => void;
    error?: string;
    isTouched?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ id, label, value, onChange, onBlur, error, isTouched }) => {
    return (
        <div>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input
                type="number"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
                onBlur={onBlur}
                className={`${styles.input} ${isTouched && error ? styles.inputError : ''}`}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default NumberInput;
