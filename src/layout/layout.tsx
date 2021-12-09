import React from 'react';
import './layout.css';
import {Cell3D} from "../cube3d/cube3d";
import {SideName} from "../types";

interface LayoutProps {
    cells: Cell3D[];
}

const filters = [
    (cell: Cell3D) => cell.x === 0,
    (cell: Cell3D) => cell.x === 2,
    (cell: Cell3D) => cell.y === 2,
    (cell: Cell3D) => cell.y === 0,
    (cell: Cell3D) => cell.z === 2,
    (cell: Cell3D) => cell.z === 0,
];

const indexToSideName: SideName[] = [
    'left',
    'right',
    'down',
    'up',
    'front',
    'back',
]

const Layout = ({cells}: LayoutProps) => {

    return (
        <div className="layout">
            {Array.from(Array(6), (a, b) => b).map((key) => {
                const sideCells = cells.filter(filters[key]);
                return <div key={key} style={{gridArea: 's' + key}}>
                    <div>{key}</div>
                    <div className="layout-side">
                        {sideCells.sort((a, b) => {
                            return a.z * 9 + a.y * 3 + a.x - (b.z * 9 + b.y * 3 + b.x);
                        }).map((cell, v) => {
                            return <div key={v}
                                        style={{backgroundColor: cell.sides[cell.map[indexToSideName[key]]].color}}
                                        className="layout-cell">
                                {cell.initialX}/{cell.initialY}/{cell.initialZ}
                            </div>

                        })}
                    </div>
                </div>
            })}
        </div>
    );
};

export default Layout;