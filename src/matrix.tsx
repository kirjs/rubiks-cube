import React from 'react';
import {combineMatrix, degToRad, matrixToCss, rotateX, rotateY, rotateZ} from "./shared";


export const Matrix = () => {


    return (
        <>
            <h1>Rotate Y + Z</h1>
            <div className="matrix-wrapper">
                {Array(36).fill(0).map((_, i) => {
                    return <div className="matrix"
                                style={{transform: matrixToCss(combineMatrix(
                                    rotateY(i * 10),
                                    rotateZ(i * 10),
                                    ))}}>
                        {i * 10}
                    </div>

                })}
            </div>
            <h1>Rotate Y</h1>
            <div className="matrix-wrapper">
                {Array(36).fill(0).map((_, i) => {
                    return <div className="matrix"
                                style={{transform: matrixToCss(rotateY(i * 10))}}>
                        {i * 10}
                    </div>

                })}
            </div>
            <h1>Rotate Z</h1>
            <div className="matrix-wrapper">
                {Array(36).fill(0).map((_, i) => {
                    return <div className="matrix"
                                style={{transform: matrixToCss(rotateZ(i * 10))}}>
                        {i * 10}
                    </div>

                })}
            </div>
            <h1>Rotate X</h1>
            <div className="matrix-wrapper">
                {Array(36).fill(0).map((_, i) => {
                    return <div className="matrix"
                                style={{transform: matrixToCss(rotateX(i * 10))}}>
                        {i * 10}
                    </div>

                })}
            </div>

            <div className="matrix"
                 style={{transform: `rotateX(0.6rad)`}}>
                LOL
            </div>
        </>
    );
};

export default Matrix;