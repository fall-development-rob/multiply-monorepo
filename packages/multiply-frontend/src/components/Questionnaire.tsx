import React, { useState, useEffect } from 'react';
import InputRenderer from './InputRenderer';
import styles from './Questionnaire.module.css'; // CSS Module
import axios from 'axios'; // Import Axios

// Define the types for question configuration
type QuestionType = 'text' | 'number' | 'dropdown' | 'radio' | 'checkbox' | 'date';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

interface Condition {
    all?: Array<{ questionId: string; value: any }>;
    any?: Array<{ questionId: string; value: any }>;
}

interface Validation {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any, allAnswers: Record<string, any>) => boolean | Promise<boolean>;
    errorMessage?: string;
    asyncValidation?: (value: any, allAnswers: Record<string, any>) => Promise<string | null>;
}

interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: Array<{ label: string; value: any }>; // For dropdowns, radio, checkbox
    validation?: Validation;
    condition?: Condition; // To determine if the question should be asked
    multiple?: boolean; // For checkboxes to allow multiple selections
}

interface QuestionnaireProps {
    questions: Question[];
    initialData?: Record<string, any>;
    onComplete: (answers: Record<string, any>) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ questions, initialData = {}, onComplete }) => {
    const [answers, setAnswers] = useState<Record<string, any>>(initialData);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isReview, setIsReview] = useState<boolean>(false);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Loading state
    const [submitError, setSubmitError] = useState<string | null>(null); // Error state

    // Helper to determine if a question should be displayed based on its condition
    const shouldDisplay = (question: Question): boolean => {
        if (!question.condition) return true;

        const { all, any } = question.condition;

        if (all) {
            return all.every((cond) => {
                const answer = answers[cond.questionId];
                return typeof cond.value === 'function' ? cond.value(answer) : answer === cond.value;
            });
        }

        if (any) {
            return any.some((cond) => {
                const answer = answers[cond.questionId];
                return typeof cond.value === 'function' ? cond.value(answer) : answer === cond.value;
            });
        }

        return true;
    };

    // Get the list of questions to be displayed based on conditions
    const getDisplayedQuestions = (): Question[] => {
        return questions.filter(shouldDisplay);
    };

    useEffect(() => {
        const updatedDisplayedQuestions = getDisplayedQuestions();
        setDisplayedQuestions(updatedDisplayedQuestions);

        // Adjust current question index if necessary
        if (currentQuestionIndex >= updatedDisplayedQuestions.length) {
            setCurrentQuestionIndex(updatedDisplayedQuestions.length - 1);
        }
    }, [answers, questions, currentQuestionIndex]);

    const currentQuestion = displayedQuestions[currentQuestionIndex];

    const handleInputChange = (id: string, value: any) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const validate = async (question: Question, value: any): Promise<string> => {
        const { validation } = question;
        if (!validation) return '';

        if (validation.required) {
            if (question.type === 'checkbox') {
                if (!value || value.length === 0) return 'This field is required.';
            } else if (value === undefined || value === '' || value === null) {
                return 'This field is required.';
            }
        }

        if (question.type === 'number') {
            const num = Number(value);
            if (isNaN(num)) return 'Please enter a valid number.';
            if (validation.min !== undefined && num < validation.min) {
                return `Value must be at least ${validation.min}.`;
            }
            if (validation.max !== undefined && num >= validation.max) {
                return `Value must be less than ${validation.max}.`;
            }
        }

        if (question.type === 'date') {
            const date = new Date(value);
            if (isNaN(date.getTime())) return 'Please enter a valid date.';
            // Additional date validations can be added here
        }

        if (validation.pattern && !validation.pattern.test(value)) {
            return 'Invalid format.';
        }

        if (validation.custom) {
            const isValid = await validation.custom(value, answers);
            if (!isValid) {
                return validation.errorMessage || 'Invalid value.';
            }
        }

        if (validation.asyncValidation) {
            const asyncError = await validation.asyncValidation(value, answers);
            if (asyncError) {
                return asyncError;
            }
        }

        return '';
    };

    const handleBlur = async (question: Question) => {
        const value = answers[question.id];
        const error = await validate(question, value);
        setErrors((prev) => ({
            ...prev,
            [question.id]: error,
        }));
        setTouched((prev) => ({
            ...prev,
            [question.id]: true,
        }));

        if (!error) {
            // If it's the last question, proceed to review
            if (currentQuestionIndex === displayedQuestions.length - 1) {
                setIsReview(true);
            } else {
                // Proceed to next question
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await axios.post('http://localhost:5000/user', answers, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Submission response:', response.data);
            setIsSubmitting(false);
            setIsComplete(true);
            onComplete(answers);
        } catch (error: any) {
            console.error('Error submitting questionnaire:', error);
            setSubmitError('An error occurred while submitting your answers. Please try again.');
            setIsSubmitting(false);
        }
    };

    const renderQuestion = () => {
        if (!currentQuestion) return null;

        return (
            <div className={styles.question}>
                <InputRenderer
                    question={currentQuestion}
                    value={answers[currentQuestion.id] || (currentQuestion.type === 'checkbox' ? [] : '')}
                    onChange={(value) => handleInputChange(currentQuestion.id, value)}
                    onBlur={() => handleBlur(currentQuestion)}
                    error={errors[currentQuestion.id]}
                    isTouched={touched[currentQuestion.id]}
                />
            </div>
        );
    };

    const renderReview = () => {
        return (
            <div className={styles.review}>
                <h3>Review Your Answers</h3>
                <ul className={styles.answerList}>
                    {displayedQuestions.map((question) => (
                        <li key={question.id} className={styles.answerItem}>
                            <strong>{question.text}</strong>
                            <div className={styles.answerValue}>
                                {Array.isArray(answers[question.id])
                                    ? answers[question.id].join(', ')
                                    : String(answers[question.id])}
                            </div>
                        </li>
                    ))}
                </ul>
                {submitError && <div className={styles.submitError}>{submitError}</div>}
                <div className={styles.buttonContainer}>
                    <button
                        onClick={() => setIsReview(false)}
                        className={`${styles.button} ${styles.buttonSecondary}`}
                        disabled={isSubmitting}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`${styles.button} ${styles.buttonPrimary}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        );
    };

    if (isComplete) {
        return <div className={styles.successMessage}>Success! Thank you for completing the questionnaire.</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Multiply Questionnaire</h2>
            {!isReview ? (
                <>
                    {renderQuestion()}
                    <div className={styles.buttonContainer}>
                        {currentQuestionIndex > 0 && (
                            <button
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                                className={`${styles.button} ${styles.buttonSecondary}`}
                            >
                                Back
                            </button>
                        )}
                        {/* The Next button is handled via onBlur in the input components */}
                    </div>
                </>
            ) : (
                renderReview()
            )}
        </div>
    );
};

export default Questionnaire;
