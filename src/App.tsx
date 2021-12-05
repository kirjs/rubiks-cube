import React, {useReducer, useState} from 'react';


import './App.css';
//
// import {
//     createCube,
//     reverseRotateMatrix,
//     rotate0,
//     rotateCube,
//     shift
// } from "./cube/helpers";
// import Cube from "./cube/Cube";
// import {CubeData, UpdateAction} from "./types";
import {operations} from "./operations";
import Cube3D, {Cell3D} from "./cube3d/cube3d";

const initialCells: Cell3D[] = new Array(27).fill(0).map((_, i) => {
    return {
        id: i.toString(),
        x: i % 3,
        y: Math.floor(i / 3) % 3,
        z: Math.floor(i / 9),
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
    }
});

function App() {
    // const [lastAction, setLastAction] = useState<UpdateAction>();
    //
    // const [cube, dispatch] = useReducer((cube: CubeData, {operation, cycle, rotateMatrix}: UpdateAction) => {
    //     rotateMatrix = rotateMatrix || [rotate0, rotate0, rotate0, rotate0];
    //     const rotatedCube = rotateCube(cube, cycle, rotateMatrix);
    //     let shiftedCube = shift(rotatedCube, cycle, operation);
    //     return rotateCube(shiftedCube, cycle, reverseRotateMatrix(rotateMatrix));
    // }, createCube());
    //
    // let handleAction = (action: UpdateAction) => {
    //     dispatch(action);
    //     setLastAction(action);
    // };

    const [rotateX, setRotateX] = useState(-30);
    const [rotateY, setRotateY] = useState(-30);
    const [rotateZ, setRotateZ] = useState(0);

    const [cells, dispatch] = useReducer((state: Cell3D[], action: string) => {
        return state.map(cell => {
            if (cell.x === 2) {
                console.log('lol');
                return {
                    ...cell,
                    z: 2 - cell.y,
                    y: cell.z,
                    rotateX: (cell.rotateX - 90),
                };

            }
            return cell;
        });
    }, initialCells);

    console.log(cells);
    return (

        <div className="App">
            <Cube3D cells={cells} rotate={{rotateX, rotateY, rotateZ}}></Cube3D>
            {/*<Cube cube={cube} lastAction={lastAction}/>*/}
            <div>
                <input type="range" value={rotateX} onChange={(e) => setRotateX(+e.target.value)} min={-180} max={180}/>
                <input type="range" value={rotateY} onChange={(e) => setRotateY(+e.target.value)} min={-180} max={180}/>
                <input type="range" value={rotateZ} onChange={(e) => setRotateZ(+e.target.value)} min={-180} max={180}/>
            </div>
            {Object.entries(operations).map(([name, action], i) => {
                return <button onClick={() => {
                    dispatch(name);
                }} key={i}>{name}
                </button>
            })}
        </div>
    );
}

export default App;
