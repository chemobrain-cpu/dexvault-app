import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css'; // Import CSS module
import { useNavigate } from 'react-router-dom';

function PushNotificationsScreen() {
  const [scale, setScale] = useState(0);
  const navigate = useNavigate()

  const navigateHandler = ()=>{
    navigate('/wallet')

  }

  useEffect(() => {
    // Start the animation for button appearance
    const scaleAnim = setInterval(() => {
      setScale((prevScale) => {
        const newScale = prevScale + 0.05;
        if (newScale >= 1) clearInterval(scaleAnim);
        return newScale;
      });
    }, 40);
  }, []);

  return (
    <div className={styles.container}>
     <div className={styles.innerContainer}>
      <h1 className={styles.title}>Push Notifications</h1>
      <p className={styles.subtitle}>
        Get notified about your wallet activity and customer support messages.
      </p>

      <img
        src={'../../notification.png'} // Adjust the path to the image
        alt="Notification"
        className={styles.image}
      />

      <div
        className={styles.button}
        style={{ transform: `scale(${scale})` }} // Applying scale animation
      >
        <button className={styles.buttonContent}>
          <span className={styles.buttonText} onClick={navigateHandler}>Allow Notifications</span>
        </button>
      </div>
    </div>
    
    </div>
   
  );
}

export default PushNotificationsScreen;
