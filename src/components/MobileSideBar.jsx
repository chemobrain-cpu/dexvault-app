import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserAlt, FaCreditCard, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import styles from './MobileSidebar.module.css';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <motion.div
        className={styles.sidebar}
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* User Info */}
        <div className={styles.userProfile}>
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className={styles.avatar}
          />
          <p className={styles.username}>Hello, Lucy</p>
        </div>

        {/* Navigation */}
        <ul className={styles.sidebarLinks}>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              <FaUserAlt /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/transactions" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              <FaCreditCard /> Transactions
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              <FaBell /> Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              <FaCog /> Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" className={({ isActive }) => isActive ? styles.activeLink : ''}>
              <FaSignOutAlt /> Log Out
            </NavLink>
          </li>
        </ul>
      </motion.div>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;




