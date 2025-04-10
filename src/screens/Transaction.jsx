import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Transaction.module.css';
import BuyModal from '../Modal/BuyModal';
import SendModal from '../Modal/SendModal';
import DesktopSideBar from '../components/DesktopSideBar';
import BackHeader from '../components/BackHeader'; // ✅ Use BackHeader

const Settings = () => {
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openSendModal, setOpenSendModal] = useState(false);

  const navigate = useNavigate();

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
          {/* ✅ Use BackHeader here */}
          <BackHeader
            navigateHandler={navigateHandler}
            openBuyModalFun={openBuyModalFun}
            openSendModalFun={openSendModalFun}
            title='Transactions'
          />

          <div className={styles.dashboardContent}>
            <div className={styles.dashboardContentleft}>

                {/*transactions code goes here*/}

                <div className={styles.transactionsContainer}>

  <ul className={styles.transactionList}>
    {[
      { type: 'Send', amount: '-₿0.002', date: 'Apr 9, 2025' },
      { type: 'Receive', amount: '+₿0.005', date: 'Apr 7, 2025' },
      { type: 'Swap', amount: '₿0.001', date: 'Apr 6, 2025' },
    ].map((tx, index) => (
      <li key={index} className={styles.transactionCard}>
        <div className={styles.txDetails}>
          <span className={styles.txType}>{tx.type}</span>
          <span className={styles.txDate}>{tx.date}</span>
        </div>
        <span
          className={`${styles.txAmount} ${tx.amount.startsWith('-') ? styles.sent : styles.received}`}
        >
          {tx.amount}
        </span>
      </li>
    ))}
  </ul>
</div>


             



            </div>
            <div className={styles.dashboardContentright}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;