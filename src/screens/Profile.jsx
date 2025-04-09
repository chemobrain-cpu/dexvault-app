import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';
import { FaBell, FaUser } from 'react-icons/fa';
import axios from 'axios';
import BuyModal from '../Modal/BuyModal';
import SendModal from '../Modal/SendModal';
import { HiArrowLeft } from 'react-icons/hi';
import DesktopSideBar from '../components/DesktopSideBar';
import BackHeader from '../components/BackHeader'; // Import BackHeader component


const Profile = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openBuyModal, setOpenBuyModal] = useState(false);
    const [openSendModal, setOpenSendModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptoData = async () => {
            if (loading) return;
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 20,
                        page: 1
                    }
                });
                setCryptoData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
                setLoading(false);
            }
        };
        fetchCryptoData();
    }, []);

    const openBuyModalFun = () => setOpenBuyModal(true);
    const openSendModalFun = () => setOpenSendModal(true);
    const buyFunction = () => setOpenBuyModal(false);
    const sellFunction = () => setOpenBuyModal(false);
    const sendFunction = () => setOpenSendModal(false);
    const receiveFunction = () => setOpenSendModal(false);
    const navigateHandler = () => navigate(-1);

    return (
        <>
            {openBuyModal && <BuyModal buyFun={buyFunction} sellFun={sellFunction} />}
            {openSendModal && <SendModal sendFun={sendFunction} receiveFun={receiveFunction} />}
            <div className={styles.dashboard}>
                <div className={styles.leftSection}>
                    <DesktopSideBar />
                </div>

                <div className={styles.mainSection}>
                    <BackHeader
                        navigateHandler={navigateHandler} // Pass the navigateHandler to BackHeader
                        openBuyModalFun={openBuyModalFun} // Pass the function to open the Buy Modal
                        openSendModalFun={openSendModalFun} // Pass the function to open the Send Modal
                        title='Profile'
                    />

                    <div className={styles.dashboardContent}>
                        <div className={styles.dashboardContentleft}>
                            {/* profile code goes in here */}
                            <div className={styles.profileCard}>
                                <div className={styles.profileTop}>
                                    <div className={styles.avatarWrapper}>
                                        <img
                                            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=200&h=200&q=80"
                                            alt="User Avatar"
                                            className={styles.avatar}
                                        />
                                    </div>
                                    <div className={styles.userDetails}>
                                        <h2 className={styles.name}>Satoshi Nakamoto</h2>
                                        <p className={styles.email}>satoshi@cryptovault.io</p>
                                    </div>
                                </div>

                                <div className={styles.divider} />

                                <div className={styles.detailsSection}>
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Wallet Address</span>
                                        <p className={styles.value}>0x9f1d...42A9</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Default Token</span>
                                        <p className={styles.value}>USDT</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>Network</span>
                                        <p className={styles.value}>Ethereum Mainnet</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.label}>2FA Status</span>
                                        <p className={styles.value}>Enabled</p>
                                    </div>
                                </div>

                                <div className={styles.buttonWrapper}>
                                    <button className={styles.editProfileBtn}>Edit Profile</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dashboardContentright}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
