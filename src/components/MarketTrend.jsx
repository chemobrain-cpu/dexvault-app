import React, { useMemo } from 'react';
import styles from './MarketTrend.module.css';

const MarketTrend = ({ data }) => {

    // Memoize the chartData to prevent recalculating on every render
    const generateChartData = (token) => {
        return Array(10).fill().map((_, i) => ({
            name: `-${10 - i}h`,
            change: token.price_change_percentage_24h + (Math.random() - 0.5) * 2, // Simulated fluctuation
        }));
    };

    return (
        <div className={styles.container}>
            {data.map((token) => {
                const chartData = useMemo(() => generateChartData(token), [token]);

                return (
                    <div className={styles.cryptocard} key={token.id}>
                        <div className={styles.cryptocardLeft}>
                            <img
                                src={token.image}
                                alt={`${token.id} icon`}
                                className={styles.cryptocardImage}
                            />
                            <div className={styles.cryptocardNameCon}>
                                <p className={styles.cryptocardName}>
                                    {token.id.charAt(0).toUpperCase() + token.id.slice(1, 8)}
                                </p>
                            </div>
                        </div>

                        <div className={styles.cryptocardRight}>
                            <p className={styles.cryptocardPrice} style={{color:token.price_change_percentage_24h >= 0 ? 'green' : 'red'}}>${token.current_price.toFixed(2)}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MarketTrend;

