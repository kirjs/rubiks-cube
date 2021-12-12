import React from 'react';
import './cube3d.css';
import {matrixToCss, TransformMatrix} from "../shared";
import {SideName} from "../types";

interface Rotatable {
    rotateX: number;
    rotateY: number;
    rotateZ: number;
}


export interface Side {
    name: string;
    color: string;
}

export interface Cell3D {
    id: string;
    x: number;
    y: number;
    z: number;
    initialX: number;
    initialY: number;
    initialZ: number;
    rotates: TransformMatrix;
    map: Record<SideName, number>,
    sides: Side[];
}

interface Cube3DProps {
    cells: Cell3D[];
    rotate: Rotatable;
}

const Cube3D = ({rotate, cells}: Cube3DProps) => {



    return (
        <div className="wrapper">
            <div className="cube" style={{
                transform: `                                   
                                    perspective(500px)
                                    rotateX(${rotate.rotateX}deg)                                                                      
                                    rotateY(${rotate.rotateY}deg)                                                                          
                                    rotateZ(${rotate.rotateZ}deg)
                                 
                                `
            }}>
                {cells.map(cell => {
                    return   <div
                        key={cell.id}
                        style={{
                            transform: `  
                                ${matrixToCss(cell.rotates)}                           
                                    translate3d(                                    
                                    calc(var(--cell-size) * ${cell.initialX - 1}),
                                    calc(var(--cell-size) * ${cell.initialY - 1}),
                                    calc(var(--cell-size) * ${cell.initialZ - 1})
                                    )                                                                  
                                `
                        }}
                        className="cell">
                        {cell.sides.map(e => {
                            let color = e.color;
                            if (
                                (e.name === 'front' && cell.initialZ !== 2) ||
                                (e.name === 'back' && cell.initialZ !== 0) ||
                                (e.name === 'up' && cell.initialY !== 0) ||
                                (e.name === 'down' && cell.initialY !== 2) ||
                                (e.name === 'right' && cell.initialX !== 2) ||
                                (e.name === 'left' && cell.initialX !== 0)

                            ) {
                                    color = '#444';
                                }
                                return <div
                                    className={`side ${e.name}`}
                                    key={e.name}
                                    style={{backgroundColor: color}}>
                                    {/* {cell.x},
                                    {cell.y},
                                    {cell.z} */}
                                </div>;
                            })}
                        </div>
                })}
            </div>
        </div>
    );
};

export default Cube3D;