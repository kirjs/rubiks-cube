import React from 'react';
import {CubeData, UpdateAction} from "../types";
import styles from './Cube.module.css'

interface CubeProps {
    cube: CubeData;
    lastAction?: UpdateAction
}

function Cube({cube}: CubeProps) {
    return (
        <div className={styles.layout}>
            {cube.map((side, key) => {
                const style = {gridArea: 's' + key}


                return <div style={style} key={key}>

                </div>;
            })}
        </div>
    );
}

export default Cube;
