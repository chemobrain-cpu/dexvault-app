import React from "react";
import styles from "./BuyModal.module.css";
import { useNavigate } from "react-router-dom";

const BuyModal = ({ sellFun,buyFun }) => {
  let navigate = useNavigate()
  if (false) return null;





  const navigateSell = ()=>{
    navigate('/sell-assets')
  }


  const navigateBuy = ()=>{
    navigate('/buy-assets')
  }




  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalView}>
        <p className={styles.modalState}>Buy and Sell crypto on dexvault</p>
        <div className={styles.modalButtonContainer}>
          <button className={styles.acceptBtn} onClick={navigateSell} >
            sell
          </button>
          <button className={styles.acceptBtn} onClick={navigateBuy}>
            buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;