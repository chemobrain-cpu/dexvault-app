import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SendAsset.module.css';
import { FaArrowDown, FaArrowUp, FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios';
import BuyModal from '../Modal/BuyModal';
import SendModal from '../Modal/SendModal';
import Transaction from '../components/Transaction';
import { Spinner } from 'react-activity';
import 'react-activity/dist/library.css';
import DesktopSideBar from '../components/DesktopSideBar';
import BackHeader from '../components/BackHeader'; // ✅ Correct import

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

const SellAsset = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openSendModal, setOpenSendModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const openBuyModalFun = () => setOpenBuyModal(true);
  const openSendModalFun = () => setOpenSendModal(true);
  const buyFunction = () => setOpenBuyModal(false);
  const sellFunction = () => setOpenBuyModal(false);
  const sendFunction = () => setOpenSendModal(false);
  const receiveFunction = () => setOpenSendModal(false);
  const navigateHandler = () => navigate(-1);

  const filteredCrypto = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <>
      {openBuyModal && <BuyModal buyFun={buyFunction} sellFun={sellFunction} />}
      {openSendModal && <SendModal sendFun={sendFunction} receiveFun={receiveFunction} />}

      <div className={styles.dashboard}>
        <div className={styles.leftSection}>
          <DesktopSideBar />
        </div>

        <div className={styles.mainSection}>
          {/* ✅ BackHeader used correctly here */}
          <BackHeader
            navigateHandler={navigateHandler}
            openBuyModalFun={openBuyModalFun}
            openSendModalFun={openSendModalFun}
            title='Select Asset'
          />

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

export default SellAsset;


