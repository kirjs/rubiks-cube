import React from 'react';
import {AnimationDirections, CubeSide} from "../types";
import styles from './Side.module.css';

interface CubeProps {
    side: CubeSide;
    animationDirections?: AnimationDirections;
}

const Side = ({side, animationDirections}: CubeProps) => {
    return (
        <div className={styles.side}>
            {side.map((row, y) => <div className={styles.row} key={y}>
                {row.map((cell, x) => <div
                    key={cell.id}
                    className={`
                    ${styles['cell-' + cell.color]} 
                    ${styles.cell}
                     ${styles['animate-' + animationDirections?.[y]?.[x]]}
                     `}
                >{cell.id}</div>)}
            </div>)}
        </div>
    );
};

export default Side;