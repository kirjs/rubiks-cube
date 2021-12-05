import React from 'react';
import './cube3d.css';

interface Rotatable {
    rotateX: number;
    rotateY: number;
    rotateZ: number;

}

export interface Cell3D extends Rotatable {
    id: string;
    x: number;
    y: number;
    z: number;
}

interface Cube3DProps {
    cells: Cell3D[];
    rotate: Rotatable;
}

const Cube3D = ({rotate, cells}: Cube3DProps) => {
    const elements = [
        {name: 'left', color: '#ffffff'},
        {name: 'right', color: '#ffee80'},
        {name: 'bottom', color: '#0751ef'},
        {name: 'top', color: '#ff0000'},
        {name: 'front', color: '#009d19'},
        {name: 'back', color: '#ff9700'},
    ];


    return (
        <div className="wrapper">
            <div className="cube" style={{
                transform: `                                   
                                    perspective(500px)                                                                      
                                    rotateY(${rotate.rotateY}deg)
                                    rotateX(${rotate.rotateX}deg)                                      
                                    rotateZ(${rotate.rotateZ}deg)
                                 
                                `
            }}>
                {cells.map(cell => {
                    return <div key={cell.id}
                                style={{
                                    transform: `                                   
                                    rotateX(${cell.rotateX}deg) 
                                    rotateY(${cell.rotateY}deg) 
                                    rotateZ(${cell.rotateZ}deg)
                                                                                                          
                                `
                                }}
                                className="cell-wrapper">
                        <div
                            style={{
                                transform: `                                   
                                    translate3d(                                    
                                    calc(var(--cell-size) * ${cell.x  -1}),
                                    calc(var(--cell-size) * ${cell.y -1}),
                                    calc(var(--cell-size) * ${cell.z -1 })
                                    )                              
                                `
                            }}
                            className="cell">
                            {elements.map(e => {
                                return <div
                                    className={`side ${e.name}`}
                                    key={e.name}
                                    style={{backgroundColor: e.color}}>
                                    {cell.x}:{cell.y}:{cell.z}#{cell.id}
                                </div>;
                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Cube3D;