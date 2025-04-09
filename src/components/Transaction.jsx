import React from 'react'
import styles from './Transaction.module.css'

const Transaction = ({transactions})=>{

   return <div className={styles.card}>
   <h3 className={styles.heading}>Recent Transactions</h3>
   <div className={styles.transactionsList}>
       {transactions.map(tx => (
           <div key={tx.id} className={styles.transactionItem}>
               <div className={styles.icon}>{tx.icon}</div>
               <div className={styles.details}>
                   <div className={styles.txType}>
                       {tx.type} <span className={styles.asset}>{tx.asset}</span>
                   </div>
                   <div className={styles.date}>{tx.date}</div>
               </div>
               <div
                   className={`${styles.amount} ${tx.amount.startsWith('+')
                       ? styles.green
                       : tx.amount.startsWith('-')
                           ? styles.red
                           : ''
                       }`}
               >
                   {tx.amount}
               </div>
           </div>
       ))}
   </div>
</div>

}



export default Transaction
