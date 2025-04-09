import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/action/appStorage';
import styles from './ImportWallet.module.css';
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";

const ImportWalletScreen = () => {
    const [seedPhrase, setSeedPhrase] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSeedPhraseChange = (e) => {
        setSeedPhrase(e.target.value);
    };

    const handleImportWallet = async () => {
        if (seedPhrase.trim().length === 0) {
            setErrorMessage("Seed phrase is required.");
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            // Simulating the wallet import process
            // Normally, here you would integrate your blockchain logic for importing the wallet
            // For example: const wallet = await importWalletFromSeed(seedPhrase);
            dispatch(authenticate(seedPhrase)); // Example action to authenticate with the wallet
            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard'); // Redirect after successful wallet import
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("Failed to import wallet. Please check your seed phrase.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <h2 className={styles.title}>Import Your Wallet</h2>
                <p className={styles.description}>Enter your 12-word seed phrase to import your wallet.</p>

                <textarea
                    className={styles.seedPhraseInput}
                    value={seedPhrase}
                    onChange={handleSeedPhraseChange}
                    placeholder="Enter your seed phrase here..."
                    rows={5}
                />

                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                <button
                    className={styles.importButton}
                    onClick={handleImportWallet}
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner size={24} color="#fff" /> : 'Import Wallet'}
                </button>

                <div className={styles.securityMessage}>
                    <p>Your seed phrase is never stored on our servers. Keep it safe!</p>
                </div>
            </div>
        </div>
    );
};

export default ImportWalletScreen;
