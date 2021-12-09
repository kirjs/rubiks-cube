import {useReducer} from "react";
import {Cell3D} from "../cube3d/cube3d";
import {map} from "../common/actions";
import {initialMatrix} from "../shared";

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


export function useCubeReducer() {
    return useReducer((state: Cell3D[], action: string) => {


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
}