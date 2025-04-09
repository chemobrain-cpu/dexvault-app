import React from "react";
import styles from "./BuyModal.module.css";
import { useNavigate } from "react-router-dom";

const SendModal = ({ modalVisible,sendFun,receiveFun }) => {
  let navigate = useNavigate()
  if (false) return null;





  const navigateSend = ()=>{
    navigate('/send-assets')
  }


  const navigateReceive = ()=>{
    navigate('/receive')

  }
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalView}>
        <p className={styles.modalState}>Send and receive crypto on dexvault</p>
        <div className={styles.modalButtonContainer}>
          <button className={styles.acceptBtn}  onClick={navigateSend}>
            send
          </button>
          <button className={styles.acceptBtn} onClick={navigateReceive}>
            receive
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendModal;