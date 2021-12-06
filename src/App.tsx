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
        initialX: i % 3,
        y: Math.floor(i / 3) % 3,
        initialY: Math.floor(i / 3) % 3,
        z: Math.floor(i / 9),
        initialZ: Math.floor(i / 9),
        rotates: []
    }
});

interface Action {
    predicate: (cell: Cell3D) => boolean;
    converter: (cell: Cell3D) => Cell3D;
}

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
        const map: Record<string, Action> = {
            RS: {
                predicate: (cell) => cell.x === 2,
                converter: (cell) => (
                    {
                        ...cell,
                        z: 2 - cell.y,
                        y: cell.z,
                        rotates: cell.rotates.concat('rotateX(-90deg)'),
                    }
                )
            },
            R: {
                predicate: (cell) => cell.x === 2,
                converter: (cell) => (
                    {
                        ...cell,
                        z: cell.y,
                        y: 2 - cell.z,
                        rotates: cell.rotates.concat('rotateX(90deg)'),
                    }
                )
            },
            US: {
                predicate: (cell) => cell.y === 0,
                converter: (cell) => (
                    {
                        ...cell,
                        z: 2 - cell.x,
                        x: cell.z,
                        rotates: cell.rotates.concat('rotateY(90deg)'),
                    }
                )
            },
            U: {
                predicate: (cell) => cell.y === 0,
                converter: (cell) => (
                    {
                        ...cell,
                        z: cell.x,
                        x: 2 - cell.z,
                        rotates: cell.rotates.concat('rotateY(-90deg)'),
                    }
                )
            },
            D: {
                predicate: (cell) => cell.y === 2,
                converter: (cell) => (
                    {
                        ...cell,
                        z: cell.x,
                        x: 2 - cell.z,
                        rotates: cell.rotates.concat('rotateY(-90deg)'),
                    }
                )
            },
            DS: {
                predicate: (cell) => cell.y === 2,
                converter: (cell) => (
                    {
                        ...cell,
                        z: 2 - cell.x,
                        x: cell.z,
                        rotates: cell.rotates.concat('rotateY(90deg)'),
                    }
                )
            },
            LS: {
                predicate: (cell) => cell.x === 0,
                converter: (cell) => (
                    {
                        ...cell,
                        z: 2 - cell.y,
                        y: cell.z,
                        rotates: cell.rotates.concat('rotateX(-90deg)'),
                    }
                )
            },
            L: {
                predicate: (cell) => cell.x === 0,
                converter: (cell) => (
                    {
                        ...cell,
                        z: cell.y,
                        y: 2 - cell.z,
                        rotates: cell.rotates.concat('rotateX(90deg)'),
                    }
                )
            },


            BS: {
                predicate: (cell) => cell.z === 0,
                converter: (cell) => (
                    {
                        ...cell,
                        x: cell.y,
                        y: 2 - cell.x,
                        rotates: cell.rotates.concat('rotateZ(-90deg)'),
                    }
                )
            },
            B: {
                predicate: (cell) => cell.z === 0,
                converter: (cell) => (
                    {
                        ...cell,
                        x: 2 - cell.y,
                        y: cell.x,
                        rotates: cell.rotates.concat('rotateZ(90deg)'),
                    }
                )
            },

            FS: {
                predicate: (cell) => cell.z === 2,
                converter: (cell) => (
                    {
                        ...cell,
                        x: cell.y,
                        y: 2 - cell.x,
                        rotates: cell.rotates.concat('rotateZ(-90deg)'),
                    }
                )
            },
            F: {
                predicate: (cell) => cell.z === 2,
                converter: (cell) => (
                    {
                        ...cell,
                        x: 2 - cell.y,
                        y: cell.x,
                        rotates: cell.rotates.concat('rotateZ(90deg)'),
                    }
                )
            },
        }


        let handler = map[action];
        if (handler) {
            return state.map(cell => {
                if (handler.predicate(cell)) {
                    return handler.converter(cell);
                }
                return cell;
            });
        }

        return state;
    }, initialCells);

    return (

        <div className="App">
            <Cube3D cells={cells}
                    rotate={{rotateX, rotateY, rotateZ}}></Cube3D>
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
            <button onClick={() => {
                const o = Object.keys(operations);
                const i = Math.floor(Math.random() * o.length);
                console.log(o[i])
                dispatch(o[i]);
            }}>random
            </button>
        </div>
    );
}

export default App;
