import React, {useReducer} from 'react';

import './App.css';

import {
    createCube,
    reverseRotateMatrix,
    rotate0,
    rotate180,
    rotate270,
    rotate90,
    rotateCube,
    shift
} from "./cube/helpers";
import Cube from "./cube/Cube";
import {CubeData, Cycle, RotateMatrix, ShiftOperation} from "./types";


interface UpdateAction {
    operation: ShiftOperation;
    cycle: Cycle;
    rotateMatrix?: RotateMatrix;
}


function App() {
    const [cube, dispatch] = useReducer((cube: CubeData, {operation, cycle, rotateMatrix}: UpdateAction) => {
        rotateMatrix = rotateMatrix || [rotate0, rotate0, rotate0, rotate0];
        const rotatedCube = rotateCube(cube, cycle, rotateMatrix);
        let shiftedCube = shift(rotatedCube, cycle, operation);
        return rotateCube(shiftedCube, cycle, reverseRotateMatrix(rotateMatrix));
    }, createCube());


    const cycles = {
        X: [2, 3, 4, 5],
        Y: [1, 3, 0, 5],
        Z: [2, 1, 4, 0],

    } as const;


    const sideRotateMatrix = [rotate270, rotate180, rotate90, rotate0,] as const;
    const LRRotateMatrix = [rotate0, rotate0, rotate0, rotate180] as const;
    const operations: Record<string, UpdateAction> = {
        U: {
            operation: [
                [1, 1, 1],
                [0, 0, 0],
                [0, 0, 0],
            ],
            cycle: cycles.X,

        },
        US: {
            operation: [
                [-1, -1, -1],
                [0, 0, 0],
                [0, 0, 0],
            ],
            cycle: cycles.X,

        },
        DS: {
            operation: [
                [0, 0, 0],
                [0, 0, 0],
                [1, 1, 1],
            ],
            cycle: cycles.X,

        },
        D: {
            operation: [
                [0, 0, 0],
                [0, 0, 0],
                [-1, -1, -1],
            ],
            cycle: cycles.X,

        },

        L: {
            operation: [
                [-1, 0, 0],
                [-1, 0, 0],
                [-1, 0, 0],
            ],
            cycle: cycles.Y,
            rotateMatrix: LRRotateMatrix,

        },
        LS: {
            operation: [
                [1, 0, 0],
                [1, 0, 0],
                [1, 0, 0],
            ],
            cycle: cycles.Y,
            rotateMatrix: LRRotateMatrix,
        },
        RS: {
            operation: [
                [0, 0, -1],
                [0, 0, -1],
                [0, 0, -1],
            ],
            cycle: cycles.Y,
            rotateMatrix: LRRotateMatrix,

        },
        R: {
            operation: [
                [0, 0, 1],
                [0, 0, 1],
                [0, 0, 1],
            ],
            cycle: cycles.Y,
            rotateMatrix: LRRotateMatrix,

        },

        F: {
            operation: [
                [-1, -1, -1],
                [0, 0, 0],
                [0, 0, 0],
            ],
            cycle: cycles.Z, // 2 1 4 0
            rotateMatrix: sideRotateMatrix
        },
        FS: {
            operation: [
                [1, 1, 1],
                [0, 0, 0],
                [0, 0, 0],
            ],
            cycle: cycles.Z,
            rotateMatrix: sideRotateMatrix
        },
        BS: {
            operation: [
                [0, 0, 0],
                [0, 0, 0],
                [-1, -1, -1],
            ],
            cycle: cycles.Z,
            rotateMatrix: sideRotateMatrix

        },
        B: {
            operation: [
                [0, 0, 0],
                [0, 0, 0],
                [1, 1, 1],
            ],
            cycle: cycles.Z,
            rotateMatrix: sideRotateMatrix

        },


    };


    // const cube2 = shift(cube, cycle, operation);
    return (
        <div className="App">
            <Cube cube={cube}/>
            {Object.entries(operations).map(([name, action]) => {
                return <button onClick={() => dispatch(action)}>{name}
                </button>
            })}
        </div>
    );
}

export default App;
