import {createCube, rotate90, shift} from "./helpers";
import {CubeSide, ShiftOperation} from "../types";

describe('shift', function () {
    it('lol', function () {
        const cube = createCube();
        const cycle = [2, 3, 4, 5] as const;

        const operation: ShiftOperation = [
            [1, 1, 1],
            [0, 0, 0],
            [0, 0, 0],
        ];

        expect(shift(cube, cycle, operation)).toMatchSnapshot();
    });
});
describe('rotate', function () {
    it('rotates', function () {
        const side = [
            [1, 2, 3],
            [4, 5, 6],
            [5, 5, 5],
        ] as CubeSide;


        expect(rotate90(side)).toEqual([
            [5, 4, 1],
            [5, 5, 2],
            [5, 6, 3]]);
    });
});