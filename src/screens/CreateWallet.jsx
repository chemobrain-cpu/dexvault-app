import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/action/appStorage';
import styles from './CreateWallet.module.css';
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";

const CreateWalletScreen = () => {
    const [seedPhrase, setSeedPhrase] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const generateSeedPhrase = () => {
        // Simulating seed phrase generation. Normally, this would be securely generated.
        const newSeedPhrase = "apple banana cherry date elderberry fig grape honeydew";
        setSeedPhrase(newSeedPhrase);
    };

    const handleCreateWallet = async () => {
        if (seedPhrase.trim().length === 0) {
            setErrorMessage("Seed phrase is required.");
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            // Dispatch authenticate action, which would normally involve interacting with the blockchain
            dispatch(authenticate(seedPhrase));
            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard'); // Redirect after successful wallet creation
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Failed to create wallet. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h2 className={styles.title}>Create Your Wallet</h2>
                <p className={styles.description}>Generate a new wallet by creating a seed phrase.</p>

                <button
                    className={styles.generateButton}
                    onClick={generateSeedPhrase}
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner size={24} color="#fff" /> : 'Generate Seed Phrase'}
                </button>

                {seedPhrase && (
                    <div className={styles.seedPhraseContainer}>
                        <textarea
                            className={styles.seedPhraseInput}
                            value={seedPhrase}
                            readOnly
                            rows={5}
                        />
                    </div>
                )}

                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                <button
                    className={styles.createButton}
                    onClick={handleCreateWallet}
                    disabled={isLoading || !seedPhrase}
                >
                    {isLoading ? <Spinner size={24} color="#fff" /> : 'Create Wallet'}
                </button>

                <div className={styles.securityMessage}>
                    <p>Your seed phrase is never stored on our servers. Keep it safe!</p>
                </div>
            </div>
        </div>
    );
};

export default CreateWalletScreen;
