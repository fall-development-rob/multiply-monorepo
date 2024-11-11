import React from 'react';
import styles from './InputComponents.module.css'; // CSS Module

interface Option {
    label: string;
    value: any;
}

interface RadioGroupProps {
    id: string;
    label: string;
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    options: Option[];
    error?: string;
    isTouched?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ id, label, value, onChange, onBlur, options, error, isTouched }) => {
    return (
        <div>
            <label className={styles.label}>{label}</label>
            <div>
                {options.map((option) => (
                    <label key={option.value} className={styles.radioLabel}>
                        <input
                            type="radio"
                            name={id}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            onBlur={onBlur}
                        />
                        {option.label}
                    </label>
                ))}
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default RadioGroup;
