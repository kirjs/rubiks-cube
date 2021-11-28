import React from 'react';
import {CubeSide} from "../types";
import styles from './Side.module.css';

interface CubeProps {
    side: CubeSide
}


const Side = ({side}: CubeProps) => {
    return (
        <div className={styles.side}>
            {side.map((row, k) => <div className={styles.row} key={k}>
                {row.map((cell, key) => <div
                    key={key}
                    className={`${styles['cell-' + cell]} ${styles.cell} `}
                />)}
            </div>)}
        </div>
    );
};

export default Side;