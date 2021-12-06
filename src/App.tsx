import React, {useEffect, useReducer, useState} from 'react';


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
import {combineMatrix, initialMatrix, rotateX, rotateY, rotateZ} from "./shared";

const initialCells: Cell3D[] = new Array(27).fill(0).map((_, i) => {
    return {
        id: i.toString(),
        x: i % 3,
        initialX: i % 3,
        y: Math.floor(i / 3) % 3,
        initialY: Math.floor(i / 3) % 3,
        z: Math.floor(i / 9),
        initialZ: Math.floor(i / 9),
        rotates: initialMatrix()
    }
});

interface Action {
    predicate: (cell: Cell3D) => boolean;
    converter: (cell: Cell3D) => Cell3D;
}


const map: Record<string, Action> = {
    RS: {
        predicate: (cell) => cell.x === 2,
        converter: (cell) => (
            {
                ...cell,
                z: 2 - cell.y,
                y: cell.z,
                rotates: combineMatrix(rotateX(90), cell.rotates),
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
                rotates: combineMatrix(rotateX(-90), cell.rotates),
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
                rotates: combineMatrix(rotateY(-90), cell.rotates),
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
                rotates: combineMatrix(rotateY(90), cell.rotates),
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
                rotates: combineMatrix(rotateY(90), cell.rotates),
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
                rotates: combineMatrix(rotateY(-90), cell.rotates),
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
                rotates: combineMatrix(rotateX(90), cell.rotates),
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
                rotates: combineMatrix(rotateX(-90), cell.rotates),
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
                rotates: combineMatrix(rotateZ(90), cell.rotates),
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
                rotates: combineMatrix(rotateZ(-90), cell.rotates),
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
                rotates: combineMatrix(rotateZ(90), cell.rotates),
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
                rotates: combineMatrix(rotateZ(-90), cell.rotates),
            }
        )
    },
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

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            const key = e.code.replace('Key', '') + (e.shiftKey ? 'S' : '');
            if (map[key]) {
                dispatch(key);
            }
        };
        document.body.addEventListener('keydown', listener);
        return () => {
            document.body.removeEventListener('keydown', listener);
        }
    }, []);

    const [rotateCubeX, setRotateCubeX] = useState(-30);
    const [rotateCubeY, setRotateCubeY] = useState(-30);
    const [rotateCubeZ, setRotateCubeZ] = useState(0);

    const [cells, dispatch] = useReducer((state: Cell3D[], action: string) => {


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
    console.log(cells);
    return (

        <div className="App">
            {/*<Matrix></Matrix>*/}
            <Cube3D cells={cells}
                    rotate={{rotateX: rotateCubeX, rotateY: rotateCubeY, rotateZ: rotateCubeZ}}></Cube3D>
            {/*<Cube cube={cube} lastAction={lastAction}/>*/}
            <div>
                <input type="range" value={rotateCubeX} onChange={(e) => setRotateCubeX(+e.target.value)} min={-180}
                       max={180}/>
                <input type="range" value={rotateCubeY} onChange={(e) => setRotateCubeY(+e.target.value)} min={-180}
                       max={180}/>
                <input type="range" value={rotateCubeZ} onChange={(e) => setRotateCubeZ(+e.target.value)} min={-180}
                       max={180}/>
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
