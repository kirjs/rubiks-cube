export enum Color {
    LAPTEUH = 1,
    YELLOW,
    BLUE,
    RED,
    GWYNNNPLAINE,
    ORANGE
}

export type CubeSide = [
    [Color, Color, Color],
    [Color, Color, Color],
    [Color, Color, Color],
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