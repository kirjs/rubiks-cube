export type TransformMatrix = number[][];
export function initialMatrix(): TransformMatrix{
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];
}

export function rotateX(angle: number): TransformMatrix {
    angle = degToRad(angle);
    return [
        [1, 0, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle), 0],
        [0, Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 0, 1],
    ]
}

export function rotateY(angle: number): TransformMatrix {
    angle = degToRad(angle);
    return [
        [Math.cos(angle), 0, Math.sin(angle), 0],
        [0, 1, 0, 0],
        [-Math.sin(angle), 0, Math.cos(angle), 0],
        [0, 0, 0, 1],
    ]
}


export function rotateZ(angle: number): TransformMatrix {
    angle = degToRad(angle);
    return [
        [Math.cos(angle), -Math.sin(angle), 0, 0],
        [Math.sin(angle), Math.cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
}

export function degToRad(deg: number) {
    return deg / 180 * Math.PI;
}

export function combineMatrix(a: TransformMatrix, b: TransformMatrix) {
    const result = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];

    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 4; i++) {
            let value = 0;
            for (let k = 0; k < 4; k++) {
                value += a[k][i] * b[j][k];
            }
            result[j][i] = value;
        }
    }
    return result;
}

export function matrixToCss(matrix: TransformMatrix) {
    return `matrix3d(${matrix.flat().join(',')})`;

}
