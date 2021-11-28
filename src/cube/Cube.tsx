import React from 'react';
import {CubeData} from "../types";
import Side from "./Side";
import styles from './Cube.module.css'

interface CubeProps {
    cube: CubeData;
}

function Cube({cube}: CubeProps) {
    return (
        <div className={styles.layout}>
            {cube.map((side, key) => {
                const style = {gridArea: 's' + key}
                return <div style={style}>
                    <Side side={side} key={key}></Side>
                </div>;
            })}
        </div>
    );
}

export default Cube;
