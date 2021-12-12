import React from 'react';
import './layout.css';
import {Cell3D} from '../cube3d/cube3d';
import {SideName} from '../types';

interface LayoutProps {
  cells: Cell3D[];
}

const filters = {
  left: (cell: Cell3D) => cell.x === 0,
  right: (cell: Cell3D) => cell.x === 2,
  down: (cell: Cell3D) => cell.y === 2,
  up: (cell: Cell3D) => cell.y === 0,
  front: (cell: Cell3D) => cell.z === 2,
  back: (cell: Cell3D) => cell.z === 0,
};

const sortPower = {
  left: (a: Cell3D) => a.y * 3 + a.z,
  right: (a: Cell3D) => a.y * 3 + (2 - a.z),
  down: (a: Cell3D) => (2 - a.z) * 3 + a.x,
  up: (a: Cell3D) => a.z * 3 + a.x,
  front: (a: Cell3D) => a.y * 3 + a.x,
  back: (a: Cell3D) => a.y * 3 + (2 - a.x),
};

const sideNames: SideName[] = ['left', 'right', 'down', 'up', 'front', 'back'];

const Layout = ({cells}: LayoutProps) => {
  return (
    <div className="layout">
      {sideNames.map((side) => {
        const sideCells = cells.filter(filters[side]).sort((a, b) => sortPower[side](a) - sortPower[side](b));
        return (
          <div key={side} style={{gridArea: side}}>
            <div>{side}</div>
            <div className="layout-side">
              {sideCells.map((cell, v) => {
                return (
                  <div key={v} style={{backgroundColor: cell.sides[cell.map[side]].color}} className="layout-cell">
                    {/* {cell.x}/{cell.y}/{cell.z} */}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Layout;