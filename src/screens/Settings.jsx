import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';
import {
  FaLock, FaFingerprint, FaShieldAlt, FaClock,
  FaNetworkWired, FaCoins, FaGasPump, FaSearchLocation,
  FaSun, FaLanguage, FaDollarSign, FaNewspaper, FaBell, FaUser
} from 'react-icons/fa';
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
            title='Settings'
          />

          <div className={styles.dashboardContent}>
            <div className={styles.dashboardContentleft}>

              {/* SECURITY */}
              <div className={styles.settingsSection}>
                <h3 className={styles.settingsTitle}>Security</h3>
                <div className={styles.settingsItem}><FaLock className={styles.icon} /> Change PIN</div>
                <div className={styles.settingsItem}><FaFingerprint className={styles.icon} /> Biometric Authentication</div>
                <div className={styles.settingsItem}><FaShieldAlt className={styles.icon} /> Two-Factor Authentication</div>
                <div className={styles.settingsItem}>
                  <FaClock className={styles.icon} /> Auto-Lock
                  <span className={styles.settingRight}>1 minute</span>
                </div>
              </div>

              {/* NETWORK */}
              <div className={styles.settingsSection}>
                <h3 className={styles.settingsTitle}>Network</h3>
                <div className={styles.settingsItem}><FaNetworkWired className={styles.icon} /> Select Network</div>
                <div className={styles.settingsItem}><FaCoins className={styles.icon} /> Manage Tokens</div>
                <div className={styles.settingsItem}><FaGasPump className={styles.icon} /> Gas Fee Settings</div>
                <div className={styles.settingsItem}><FaSearchLocation className={styles.icon} /> Explorer Preference</div>
              </div>

              {/* NOTIFICATIONS */}
              <div className={styles.settingsSection}>
                <h3 className={styles.settingsTitle}>Notifications</h3>
                <div className={styles.settingsItem}>
                  <FaSun className={styles.icon} /> Theme
                  <span className={styles.settingRight}>Light</span>
                </div>
                <div className={styles.settingsItem}>
                  <FaLanguage className={styles.icon} /> Language
                  <span className={styles.settingRight}>English</span>
                </div>
                <div className={styles.settingsItem}>
                  <FaDollarSign className={styles.icon} /> Currency
                  <span className={styles.settingRight}>USD</span>
                </div>
                <div className={styles.settingsItem}>
                  <FaBell className={styles.icon} /> Transaction Alerts
                  <label className={styles.switch}>
                    <input type="checkbox" checked readOnly />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.settingsItem}>
                  <FaBell className={styles.icon} /> Price Alerts
                  <label className={styles.switch}>
                    <input type="checkbox" checked readOnly />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.settingsItem}>
                  <FaNewspaper className={styles.icon} /> News & Announcements
                  <label className={styles.switch}>
                    <input type="checkbox" checked readOnly />
                    <span className={styles.slider}></span>
                  </label>
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

export default Settings;
