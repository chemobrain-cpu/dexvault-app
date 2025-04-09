import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Send.module.css';
import { FaArrowDown, FaArrowUp, FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios';
import BuyModal from '../Modal/BuyModal';
import SendModal from '../Modal/SendModal';
import Transaction from '../components/Transaction';
import 'react-activity/dist/library.css';
import DesktopSideBar from '../components/DesktopSideBar';
import BackHeader from '../components/BackHeader'; // ✅ Using shared header

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

const Send = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openSendModal, setOpenSendModal] = useState(false); // Optional for future modal support

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptoData = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 20,
            page: 1
          }
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      } finally {
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
  const sendHandler = () => navigate('/send');

  return (
    <>
      {/* ✅ Conditional modals */}
      {openBuyModal && <BuyModal buyFun={buyFunction} sellFun={sellFunction} />}
      {openSendModal && <SendModal sendFun={sendFunction} receiveFun={receiveFunction} />}


      <div className={styles.dashboard}>
        <div className={styles.leftSection}>
          <DesktopSideBar />
        </div>

        <div className={styles.mainSection}>
          {/* ✅ Shared BackHeader at the top */}
          <BackHeader
            navigateHandler={navigateHandler}
            openBuyModalFun={openBuyModalFun}
            openSendModalFun={openSendModalFun}
            title='Send Asset'
          />

          <div className={styles.dashboardContent}>
            <div className={styles.dashboardContentleft}>
              <div className={styles.balanceSection}>
                <div className={styles.balanceCard}>
                  <p className={styles.amount}>$500.00</p>
                  <p className={styles.amounttext}>Your wallet balance</p>
                </div>
              </div>

              <div className={styles.sendBox}>
                <label className={styles.label}>Recipient Address</label>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Enter wallet address"
                />

                <label className={styles.label}>Asset</label>
                <select className={styles.inputField}>
                  <option value="btc">Bitcoin (BTC)</option>
                  <option value="eth">Ethereum (ETH)</option>
                  <option value="usdt">Tether (USDT)</option>
                </select>

                <label className={styles.label}>Amount</label>
                <input
                  type="number"
                  className={styles.inputField}
                  placeholder="Enter amount"
                />

                <button className={styles.sendButton}>Send</button>
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

export default Send;

