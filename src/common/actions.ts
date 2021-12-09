import {combineMatrix, rotateX, rotateY, rotateZ} from "../shared";
import {Cell3D} from "../cube3d/cube3d";
interface Action {
    predicate: (cell: Cell3D) => boolean;
    converter: (cell: Cell3D) => Cell3D;
}


export const map: Record<string, Action> = {
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
    DS: {
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
    D: {
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
    L: {
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
    LS: {
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
    B: {
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
    BS: {
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