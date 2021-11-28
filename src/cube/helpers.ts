import {Cell, Color, CubeData, CubeRow, CubeSide, Cycle, RotateFn, RotateMatrix, ShiftOperation} from "../types";


export function createSide(color: Color, startIndex: number): CubeSide {
    const result: Partial<CubeRow[]> = []
    for (let i = 0; i < 3; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < 3; j++) {
            row.push({
                color: color,
                id: (startIndex++).toString()
            })
        }

        result.push(row as unknown as CubeRow);
    }

    // TOOD(kirjs): Figure out if there's a good way to type it.
    return result as unknown as CubeSide;
}

export function createCube(): CubeData {
    const result: CubeSide[] = [];
    let i = 0;
    for (const color of Object.values(Color)) {
        if (typeof color === 'number') {
            result.push(createSide(color, (i++) * 9));
        }
    }

    return result as CubeData;
}


export function shift(cube: CubeData, cycle: Cycle, operation: ShiftOperation): CubeData {
    return cube.map((side, i) => {
        let index = cycle.indexOf(i);
        if (index === -1) {
            return side;
        } else {

            return side.map((row, rowIndex) => {
                return row.map((cell, cellIndex) => {
                    const o = operation[rowIndex][cellIndex];
                    const nextIndex = (index + o + cycle.length) % cycle.length;
                    return cube[cycle[nextIndex]][rowIndex][cellIndex];
                });
            })
        }
    }) as CubeData;
}


export const rotate90 = (side: CubeSide): CubeSide => {
    return side.map((row, i) =>
        row.map((val, j) => side[side.length - 1 - j][i])
    ) as unknown as CubeSide;
};

export const rotate270 = (side: CubeSide): CubeSide => {
    return rotate90(rotate90(rotate90(side)))
};

export const rotate180 = (side: CubeSide): CubeSide => {
    return rotate90(rotate90(side))
};

export const rotate0 = (side: CubeSide): CubeSide => {
    return side;
};


const reverseRotateMap = new Map<RotateFn, RotateFn>();
reverseRotateMap.set(rotate270, rotate90);
reverseRotateMap.set(rotate180, rotate180);
reverseRotateMap.set(rotate90, rotate270);
reverseRotateMap.set(rotate0, rotate0);

export function rotateCube(cube: CubeData, cycle: Cycle, matrix: RotateMatrix): CubeData {
    return cube.map((side, i) => {
        const index = cycle.indexOf(i);
        if (index === -1) {
            return side;
        } else {
            return matrix[index](side);
        }
    }) as CubeData;
}

export function reverseRotateMatrix(matrix: RotateMatrix) {
    return matrix.map(r => reverseRotateMap.get(r) as RotateFn) as unknown as RotateMatrix;
}