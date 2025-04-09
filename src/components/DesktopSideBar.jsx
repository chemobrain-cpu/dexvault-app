import React from 'react'
import { FaBell, FaUser, FaCog, FaHome, FaSignOutAlt, FaExchangeAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import styles from './DesktopSideBar.module.css';

const DesktopSideBar = () => {
    const location = useLocation();

    const navLinks = [
        { to: "/dashboard", icon: <FaHome />, label: "Dashboard" },
        { to: "/profile", icon: <FaUser />, label: "Profile" },
        { to: "/transactions", icon: <FaExchangeAlt />, label: "Transactions" },
        { to: "/notifications", icon: <FaBell />, label: "Notifications" },
        { to: "/settings", icon: <FaCog />, label: "Settings" },
        { to: "/logout", icon: <FaSignOutAlt />, label: "Logout" },
    ];

    return (
        <div className={styles.sidebarContent}>
            <h2 className={styles.sidebarTitle}>Dexvault</h2>
            <nav className={styles.nav}>
                {navLinks.map(({ to, icon, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`${styles.navItem} ${location.pathname === to ? styles.active : ""}`}
                    >
                        {icon}
                        <p>{label}</p>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default DesktopSideBar;
