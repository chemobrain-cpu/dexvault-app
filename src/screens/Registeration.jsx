import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/action/appStorage';
import styles from './Registeration.module.css';
import AuthModal from '../Modal/AuthModal';
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";

const Registeration = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        country: '',
        currency: '',
        phone: '',
        username: '',
        referralCode: '',
        dob: '',
    });

    const [isEmailValid, setIsEmailValid] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isAuthError, setIsAuthError] = useState(false);
    const [authInfo, setAuthInfo] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateAuthError = () => {
        setIsAuthError(prev => !prev);
        setAuthInfo('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedForm = { ...formData, [name]: value };
        setFormData(updatedForm);
        setIsDisabled(Object.values(updatedForm).some(field => field === ''));
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submitHandler = async () => {
        if (isLoading) return;

        if (!formData.email || !isValidEmail(formData.email)) {
            setIsEmailValid('Enter a valid email');
            return;
        }

        setIsEmailValid('');
        setIsLoading(true);

        const res = await dispatch(authenticate(formData));

        if (!res.bool) {
            setIsLoading(false);
            setIsAuthError(true);
            setAuthInfo(res.message);
            return;
        }

        setIsLoading(false);
        navigate(`/${res.url}`, { state: { ...formData } });
    };

    return (
        <>
            {isAuthError && <AuthModal modalVisible={isAuthError} updateVisibility={updateAuthError} message={authInfo} />}
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <h2 className={styles.title}>Complete Your Registration</h2>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className={styles.input}
                        value={formData.fullName}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <p className={styles.error}>{isEmailValid}</p>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className={styles.input}
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <select
                        name="country"
                        className={styles.input}
                        value={formData.country}
                        onChange={handleChange}
                    >
                        <option value="">Select Country</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="NG">Nigeria</option>
                        <option value="IN">India</option>
                        <option value="CA">Canada</option>
                        {/* Add more countries */}
                    </select>

                    <select
                        name="currency"
                        className={styles.input}
                        value={formData.currency}
                        onChange={handleChange}
                    >
                        <option value="">Select Currency</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="NGN">NGN - Naira</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="INR">INR - Indian Rupee</option>
                        {/* Add more currencies */}
                    </select>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username (optional)"
                        className={styles.input}
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="referralCode"
                        placeholder="Referral Code (optional)"
                        className={styles.input}
                        value={formData.referralCode}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        className={styles.input}
                        value={formData.dob}
                        onChange={handleChange}
                    />

                    <button
                        className={`${styles.button} ${isDisabled ? styles.disabledButton : ''}`}
                        disabled={isDisabled}
                        onClick={submitHandler}
                    >
                        {isLoading ? (
                            <Spinner size={10} className={styles.loader} style={{ color: 'rgb(52, 134, 52)' }} />
                        ) : (
                            'Continue'
                        )}
                    </button>

                    <div className={styles.termsText}>
                        By using the Dexvault app, I agree to the <span className={styles.link}>Terms of Service</span> and
                        <span className={styles.link}> Privacy Policy</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registeration;

