import React from 'react';
import './cube3d.css';

interface Cell {
    id: string;
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
}

const Cube3D = () => {
    const cells: Cell[] = new Array(27).fill(0).map((_, i) => {
        return {
            id: i.toString(),
            x: i % 3,
            y: Math.floor(i / 3) % 3,
            z: Math.floor(i / 9),
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
        }
    })

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
            <div className="cube">
                {cells.map(cell => {
                    return <div key={cell.id}
                                style={{
                                    transform: `translate3d(
                                    calc(var(--cell-size) * ${cell.x}),
                                    calc(var(--cell-size) * ${cell.y}),
                                    calc(var(--cell-size) * ${cell.z})                                
                                )`
                                }}
                                className="cell">
                        {elements.map(e => {
                            return <div
                                className={`side ${e.name}`}
                                key={e.name}
                                style={{backgroundColor: e.color}}/>;
                        })}
                    </div>
                })}
            </div>
        </div>
    );
};

export default Cube3D;