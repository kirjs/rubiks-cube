import React from 'react';
import {CubeData, UpdateAction} from "../types";
import Side from "./Side";
import styles from './Cube.module.css'

interface CubeProps {
    cube: CubeData;
    lastAction?: UpdateAction
}

function Cube({cube, lastAction}: CubeProps) {
    return (
        <div className={styles.layout}>
            {cube.map((side, key) => {
                const style = {gridArea: 's' + key}

              //  const rotatedM = rotateCube(lastAction?.operation, lastAction?.cycle, lastAction?.rotateMatrix);
                const animationDirection = lastAction?.operation.map(r => {
                    return r.map(o => {
                        if (!o || !lastAction?.cycle.includes(key)) {
                            return undefined;
                        }

                        return ((o === -1 ? lastAction?.animations[1] : lastAction?.animations[0])) || undefined;
                    });
                });

                return <div style={style} key={key}>
                    <Side animationDirections={animationDirection} side={side} key={key}></Side>
                </div>;
            })}
        </div>
    );
}

export default Cube;
