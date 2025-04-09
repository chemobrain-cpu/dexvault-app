import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './SendAsset.module.css';
import { FaHome, FaWallet, FaChartLine, FaCog, FaBell, FaUser } from 'react-icons/fa';
import axios from 'axios';
import HomeLoader from "../Modal/HomeLoader.jsx";
import { FaArrowDown, FaArrowUp, FaExchangeAlt } from 'react-icons/fa';
import BuyModal from '../Modal/BuyModal';
import SendModal from '../Modal/SendModal'; // ✅ Newly added import
import { HiArrowLeft } from 'react-icons/hi';
import Transaction from '../components/Transaction';
import 'react-activity/dist/library.css';
import { Spinner } from 'react-activity';
import DesktopSideBar from '../components/DesktopSideBar';

const transactions = [
    {
        id: 1,
        type: 'Received',
        asset: 'BTC',
        amount: '+0.005',
        date: 'Apr 6, 2025',
        icon: <FaArrowDown className={styles.iconReceived} />
    },
    {
        id: 2,
        type: 'Sent',
        asset: 'ETH',
        amount: '-0.2',
        date: 'Apr 5, 2025',
        icon: <FaArrowUp className={styles.iconSent} />
    },
    {
        id: 3,
        type: 'Swap',
        asset: 'USDT to BTC',
        amount: '$250',
        date: 'Apr 4, 2025',
        icon: <FaExchangeAlt className={styles.iconSwap} />
    }
];

const BuyAsset = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openBuyModal, setOpenBuyModal] = useState(false);
    const [openSendModal, setOpenSendModal] = useState(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCrypto = cryptoData.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchCryptoData = async () => {
            if (loading) return;
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets',
                    {
                        params: {
                            vs_currency: 'usd',
                            order: 'market_cap_desc',
                            per_page: 20,
                            page: 1
                        }
                    }
                );
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
                    <div className={styles.headerContainer}>
                        <div className={styles.mobileHeader}>
                            <div className={styles.hamburger}>
                                <HiArrowLeft
                                    color={'black'}
                                    size={25}
                                    onClick={navigateHandler}
                                />
                            </div>
                            <h2>Buy asset</h2>
                        </div>

                        <div className={styles.title}>
                            <h2></h2>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button className={styles.buysellbutton} onClick={openBuyModalFun}>
                                Buy & Sell
                            </button>
                            <button className={styles.sendreceivebutton} onClick={openSendModalFun}>
                                Send & Receive
                            </button>
                            <button className={styles.notificationbutton}>
                                <FaBell color='black' size={18} />
                                <span>55</span>
                            </button>
                            <button className={styles.imagebutton}>
                                <FaUser color='black' size={18} />
                            </button>
                        </div>
                    </div>

                    <div className={styles.dashboardContent}>
                        <div className={styles.dashboardContentleft}>
                            <div className={styles.searchContainer}>
                                <input
                                    type="text"
                                    placeholder="Search asset..."
                                    className={styles.searchInput}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className={styles.cryptoList}>
                                {!loading ? (
                                    filteredCrypto.map((coin) => (
                                        <div key={coin.id} className={styles.cryptoItem}>
                                            <div className={styles.coinInfo}>
                                                <img src={coin.image} alt={coin.name} className={styles.coinImage} />
                                                <div>
                                                    <div className={styles.coinName}>{coin.name}</div>
                                                    <div className={styles.coinSymbol}>{coin.symbol.toUpperCase()}</div>
                                                </div>
                                            </div>
                                            <div
                                                className={styles.coinPrice}
                                                style={{
                                                    color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red'
                                                }}
                                            >
                                                ${coin.current_price.toLocaleString()}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '150px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingBottom: '20px'
                                    }}>
                                        <Spinner size={24} color="#4F46E5" speed={0.5} animating={true} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.dashboardContentright}>
                            <Transaction transactions={transactions} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyAsset;
