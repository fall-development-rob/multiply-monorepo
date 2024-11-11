// src/components/CheckboxGroup.tsx

import React from 'react';
import styles from './CheckboxGroup.module.css'; // CSS Module for CheckboxGroup

interface Option {
    label: string;
    value: any;
}

interface CheckboxGroupProps {
    id: string;
    label: string;
    value: any[];
    onChange: (value: any[]) => void;
    onBlur: () => void;
    options: Option[];
    error?: string;
    isTouched?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ id, label, value, onChange, onBlur, options, error, isTouched }) => {
    const handleCheckboxChange = (optionValue: any) => {
        if (value.includes(optionValue)) {
            onChange(value.filter((v) => v !== optionValue));
        } else {
            onChange([...value, optionValue]);
        }
    };

    return (
        <div>
            <label className={styles.label}>{label}</label>
            <div className={styles.checkboxContainer}>
                {options.map((option) => (
                    <label key={option.value} className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name={id}
                            value={option.value}
                            checked={value.includes(option.value)}
                            onChange={() => handleCheckboxChange(option.value)}
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

export default CheckboxGroup;
