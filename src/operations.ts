import {rotate0, rotate180, rotate270, rotate90} from "./cube/helpers";
import {UpdateAction} from "./types";


const cycles = {
    X: [2, 3, 4, 5],
    Y: [1, 3, 0, 5],
    Z: [2, 1, 4, 0],

} as const;


const sideRotateMatrix = [rotate270, rotate180, rotate90, rotate0,] as const;
const LRRotateMatrix = [rotate0, rotate0, rotate0, rotate180] as const;
export const operations: Record<string, UpdateAction> = {
    U: {
        operation: [
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0],
        ],
        cycle: cycles.X,
        animations: ['left', 'right']

    },
    US: {
        operation: [
            [-1, -1, -1],
            [0, 0, 0],
            [0, 0, 0],
        ],
        cycle: cycles.X,
        animations: ['left', 'right']
    },
    DS: {
        operation: [
            [0, 0, 0],
            [0, 0, 0],
            [1, 1, 1],
        ],
        cycle: cycles.X,
        animations: ['left', 'right']
    },
    D: {
        operation: [
            [0, 0, 0],
            [0, 0, 0],
            [-1, -1, -1],
        ],
        cycle: cycles.X,
        animations: ['left', 'right']
    },

    L: {
        operation: [
            [-1, 0, 0],
            [-1, 0, 0],
            [-1, 0, 0],
        ],
        cycle: cycles.Y,
        rotateMatrix: LRRotateMatrix,
        animations: ['top', 'bottom']
    },
    LS: {
        operation: [
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
        ],
        cycle: cycles.Y,
        rotateMatrix: LRRotateMatrix,
        animations: ['top', 'bottom']
    },
    RS: {
        operation: [
            [0, 0, -1],
            [0, 0, -1],
            [0, 0, -1],
        ],
        cycle: cycles.Y,
        rotateMatrix: LRRotateMatrix,
        animations: ['top', 'bottom']

    },
    R: {
        operation: [
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
        ],
        cycle: cycles.Y,
        rotateMatrix: LRRotateMatrix,
        animations: ['top', 'bottom']
    },

    F: {
        operation: [
            [-1, -1, -1],
            [0, 0, 0],
            [0, 0, 0],
        ],
        cycle: cycles.Z, // 2 1 4 0
        rotateMatrix: sideRotateMatrix,
        animations: ['left', 'right']
    },
    FS: {
        operation: [
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0],
        ],
        cycle: cycles.Z,
        rotateMatrix: sideRotateMatrix,
        animations: ['left', 'right']
    },
    BS: {
        operation: [
            [0, 0, 0],
            [0, 0, 0],
            [-1, -1, -1],
        ],
        cycle: cycles.Z,
        rotateMatrix: sideRotateMatrix,
        animations: ['left', 'right']

    },
    B: {
        operation: [
            [0, 0, 0],
            [0, 0, 0],
            [1, 1, 1],
        ],
        cycle: cycles.Z,
        rotateMatrix: sideRotateMatrix,
        animations: ['left', 'right']
    },
};
