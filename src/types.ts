export enum Color {
    LAPTEUH = 1,
    YELLOW,
    BLUE,
    RED,
    GWYNNNPLAINE,
    ORANGE
}


export type SideName = 'left' | 'right' | 'down' | 'up' | 'front' | 'back';

export interface Cell {
    color: Color,
    id: string;
}

export type CubeRow = readonly [Cell, Cell, Cell];
export  type CubeSide = readonly [
    CubeRow,
    CubeRow,
    CubeRow,
]

export type CubeData = [
    CubeSide,
    CubeSide,
    CubeSide,
    CubeSide,
    CubeSide,
    CubeSide,
]

export type Cycle = readonly [number, number, number, number];

type Operation = -1 | 0 | 1;
export type ShiftOperation = readonly [
    readonly [Operation, Operation, Operation],
    readonly [Operation, Operation, Operation],
    readonly [Operation, Operation, Operation],
];

export type RotateFn = (s: CubeSide) => CubeSide;
export type RotateMatrix = readonly [RotateFn, RotateFn, RotateFn, RotateFn];


export type AnimationDirection = 'left' | 'top' | 'right' | 'bottom' | undefined;
export type AnimationDirections = (AnimationDirection)[][];

export interface UpdateAction {
    operation: ShiftOperation;
    cycle: Cycle;
    rotateMatrix?: RotateMatrix;
    animations: [AnimationDirection, AnimationDirection];
}

