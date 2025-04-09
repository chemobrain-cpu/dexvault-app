import React, { useEffect, useState, useRef } from 'react';

const InstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const deferredPromptRef = useRef(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    const isInStandalone = 'standalone' in window.navigator && window.navigator.standalone;

    if (isIOSDevice && !isInStandalone) {
      setIsIOS(true);
      setShowBanner(true);
    }

    const handler = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    const prompt = deferredPromptRef.current;
    if (!prompt) return;

    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === 'accepted') {
      console.log('PWA installed');
    }
    deferredPromptRef.current = null;
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div style={styles.banner}>
      {isIOS ? (
        <p>
          Tap <strong>Share</strong> → <strong>Add to Home Screen</strong> to install this app
        </p>
      ) : (
        <>
          <p>Install this app?</p>
          <button onClick={handleInstallClick} style={styles.button}>Install</button>
        </>
      )}
    </div>
  );
};

const styles = {
  banner: {
    position: 'fixed',
    bottom: '1rem',
    left: '1rem',
    right: '1rem',
    background: '#fff',
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    zIndex: 999,
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
  },
};

export default InstallBanner;
