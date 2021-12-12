import {combineMatrix, rotateX, rotateY, rotateZ} from '../shared';
import {Cell3D} from '../cube3d/cube3d';

interface Action {
    predicate: (cell: Cell3D) => boolean;
    converter: (cell: Cell3D) => Cell3D;
}

export const map: Record<string, Action> = {
    RS: {
        predicate: (cell) => cell.x === 2,
        converter: (cell) => ({
            ...cell,
            z: 2 - cell.y,
            y: cell.z,
            rotates: combineMatrix(rotateX(90), cell.rotates),
            map: {
                left: cell.map.left,
                right: cell.map.right,
                up: cell.map.back,
                back: cell.map.down,
                down: cell.map.front,
                front: cell.map.up,
            },
        }),
    },
    R: {
        predicate: (cell) => cell.x === 2,
        converter: (cell) => ({
            ...cell,
            z: cell.y,
            y: 2 - cell.z,
            rotates: combineMatrix(rotateX(-90), cell.rotates),
            map: {
                left: cell.map.left,
                right: cell.map.right,
                up: cell.map.front,
                front: cell.map.down,
                down: cell.map.back,
                back: cell.map.up,
            },
        }),
    },
    US: {
        predicate: (cell) => cell.y === 0,
        converter: (cell) => ({
            ...cell,
            z: 2 - cell.x,
            x: cell.z,
            rotates: combineMatrix(rotateY(-90), cell.rotates),
            map: {
                up: cell.map.up,
                down: cell.map.down,
                left: cell.map.back,
                front: cell.map.left,
                right: cell.map.front,
                back: cell.map.right,
            },
        }),
    },
    U: {
        predicate: (cell) => cell.y === 0,
        converter: (cell) => ({
            ...cell,
            z: cell.x,
            x: 2 - cell.z,
            rotates: combineMatrix(rotateY(90), cell.rotates),
            map: {
                up: cell.map.up,
                down: cell.map.down,
                left: cell.map.front,
                front: cell.map.right,
                right: cell.map.back,
                back: cell.map.left,
            },
        }),
    },
    DS: {
        predicate: (cell) => cell.y === 2,
        converter: (cell) => ({
            ...cell,
            z: cell.x,
            x: 2 - cell.z,
            rotates: combineMatrix(rotateY(90), cell.rotates),
            map: {
                up: cell.map.up,
                down: cell.map.down,
                left: cell.map.front,
                front: cell.map.right,
                right: cell.map.back,
                back: cell.map.left,
            },
        }),
    },
    D: {
        predicate: (cell) => cell.y === 2,
        converter: (cell) => ({
            ...cell,
            z: 2 - cell.x,
            x: cell.z,
            rotates: combineMatrix(rotateY(-90), cell.rotates),
            map: {
                up: cell.map.up,
                down: cell.map.down,
                left: cell.map.back,
                front: cell.map.left,
                right: cell.map.front,
                back: cell.map.right,
            },
        }),
    },
    L: {
        predicate: (cell) => cell.x === 0,
        converter: (cell) => ({
            ...cell,
            z: 2 - cell.y,
            y: cell.z,
            rotates: combineMatrix(rotateX(90), cell.rotates),

            map: {
                left: cell.map.left,
                right: cell.map.right,
                up: cell.map.back,
                back: cell.map.down,
                down: cell.map.front,
                front: cell.map.up,
            },
        }),
    },
    LS: {
        predicate: (cell) => cell.x === 0,
        converter: (cell) => ({
            ...cell,
            z: cell.y,
            y: 2 - cell.z,
            rotates: combineMatrix(rotateX(-90), cell.rotates),
            map: {
                left: cell.map.left,
                right: cell.map.right,
                up: cell.map.front,
                front: cell.map.down,
                down: cell.map.back,
                back: cell.map.up,
            },
        }),
    },
    B: {
        predicate: (cell) => cell.z === 0,
        converter: (cell) => ({
            ...cell,
            x: cell.y,
            y: 2 - cell.x,
            rotates: combineMatrix(rotateZ(90), cell.rotates),

            map: {
                front: cell.map.front,
                back: cell.map.back,
                up: cell.map.right,
                down: cell.map.left,
                left: cell.map.up,
                right: cell.map.down,
            },
        }),
    },
    BS: {
        predicate: (cell) => cell.z === 0,
        converter: (cell) => ({
            ...cell,
            x: 2 - cell.y,
            y: cell.x,
            rotates: combineMatrix(rotateZ(-90), cell.rotates),
            map: {
                front: cell.map.front,
                back: cell.map.back,
                up: cell.map.left,
                down: cell.map.right,
                left: cell.map.down,
                right: cell.map.up,
            },
        }),
    },

    FS: {
        predicate: (cell) => cell.z === 2,
        converter: (cell) => ({
            ...cell,
            x: cell.y,
            y: 2 - cell.x,
            rotates: combineMatrix(rotateZ(90), cell.rotates),
            map: {
                front: cell.map.front,
                back: cell.map.back,
                up: cell.map.right,
                down: cell.map.left,
                left: cell.map.up,
                right: cell.map.down,
            },
        }),
    },
    F: {
        predicate: (cell) => cell.z === 2,
        converter: (cell) => ({
            ...cell,
            x: 2 - cell.y,
            y: cell.x,
            rotates: combineMatrix(rotateZ(-90), cell.rotates),
            map: {
                front: cell.map.front,
                back: cell.map.back,
                up: cell.map.left,
                down: cell.map.right,
                left: cell.map.down,
                right: cell.map.up,
            },
        }),
    },
};
