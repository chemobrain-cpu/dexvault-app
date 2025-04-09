import React from "react";
import { NavLink } from "react-router-dom";
import styles from './BottomTab.module.css';
import { FaHome, FaWallet, FaChartLine, FaCog, FaBell, FaUser } from 'react-icons/fa';

const BottomTabs = () => {

    return <div className={styles.bottomTabContainer}>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.activeTab : ''}>
            <FaHome className={styles.icon} />
            <span>Home</span>
        </NavLink>

        <NavLink to="/invest" className={({ isActive }) => isActive ? styles.activeTab : ''}>
            <FaChartLine className={styles.icon} />
            <span>Invest</span>
        </NavLink>

        <NavLink to="/assets" className={({ isActive }) => isActive ? styles.activeTab : ''}>
            <FaWallet className={styles.icon} />
            <span>Assets</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => isActive ? styles.activeTab : ''}>
            <FaCog className={styles.icon} />
            <span>Settings</span>
        </NavLink>
    </div>
}



export default BottomTabs