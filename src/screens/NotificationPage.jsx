import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import styles from './NotificationPage.module.css';
import axios from 'axios';
import BuyModal from '../Modal/BuyModal';
import SendModal from '../Modal/SendModal';
import 'react-activity/dist/library.css';
import {
    Bitcoin,
    ArrowDownLeft,
    ArrowUpRight,
} from "lucide-react"
import DesktopSideBar from '../components/DesktopSideBar';
import BackHeader from '../components/BackHeader'



const Notification = () => {
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
                        navigateHandler={navigateHandler}
                        openBuyModalFun={openBuyModalFun}
                        openSendModalFun={openSendModalFun}
                        title='Notification'
                    />


                    <div className={styles.dashboardContent}>
                        <div className={styles.dashboardContentleft}>

                            <div className={styles.notificationContainer}>
                                <div className={styles.notificationItem}>
                                    <Bitcoin className={styles.notificationIcon} />
                                    <div>
                                        <h4 className={styles.notificationTitle}>Bitcoin Purchase</h4>
                                        <p className={styles.notificationText}>You bought 0.005 BTC for $150</p>
                                    </div>
                                    <span className={styles.notificationTime}>2h ago</span>
                                </div>

                                <div className={styles.notificationItem}>
                                    <ArrowUpRight className={styles.notificationIcon} />
                                    <div>
                                        <h4 className={styles.notificationTitle}>Ethereum Transfer</h4>
                                        <p className={styles.notificationText}>0.03 ETH sent to 0x34A...E90</p>
                                    </div>
                                    <span className={styles.notificationTime}>5h ago</span>
                                </div>

                                <div className={styles.notificationItem}>
                                    <ArrowDownLeft className={styles.notificationIcon} />
                                    <div>
                                        <h4 className={styles.notificationTitle}>USDT Received</h4>
                                        <p className={styles.notificationText}>You received $200 USDT</p>
                                    </div>
                                    <span className={styles.notificationTime}>Yesterday</span>
                                </div>

                                <div className={styles.notificationItem}>
                                    <ArrowDownLeft className={styles.notificationIcon} />
                                    <div>
                                        <h4 className={styles.notificationTitle}>USDT Received</h4>
                                        <p className={styles.notificationText}>You received $200 USDT</p>
                                    </div>
                                    <span className={styles.notificationTime}>Yesterday</span>
                                </div>

                                <div className={styles.notificationItem}>
                                    <ArrowDownLeft className={styles.notificationIcon} />
                                    <div>
                                        <h4 className={styles.notificationTitle}>USDT Received</h4>
                                        <p className={styles.notificationText}>You received $200 USDT</p>
                                    </div>
                                    <span className={styles.notificationTime}>Yesterday</span>
                                </div>
                            </div>

                        </div>
                        <div className={styles.dashboardContentright}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
