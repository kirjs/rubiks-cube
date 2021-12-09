import {useReducer} from "react";
import {Cell3D} from "../cube3d/cube3d";
import {map} from "../common/actions";
import {initialMatrix} from "../shared";

const elements = [
    {name: 'left', color: '#ff9700'},
    {name: 'right', color: '#ff0000'},
    {name: 'down', color: '#ffee80'},
    {name: 'up', color: '#ffffff'},
    {name: 'front', color: '#009d19'},
    {name: 'back', color: '#0751ef'},
];

const initialCells: Cell3D[] = new Array(27).fill(0).map((_, i) => {
    let x = i % 3;
    let y = Math.floor(i / 3) % 3;
    let z = Math.floor(i / 9);

    function isHidden(name: string) {
        return (name === 'front' && z !== 2) ||
            (name === 'back' && z !== 0) ||
            (name === 'up' && y !== 0) ||
            (name === 'down' && y !== 2) ||
            (name === 'right' && x !== 2) ||
            (name === 'left' && x !== 0)
    }

    return {
        id: i.toString(),
        x,
        initialX: x,
        y,
        initialY: y,
        z,
        initialZ: z,
        rotates: initialMatrix(),
        sides: elements.map(e => {
                return {
                    ...e,
                    color: isHidden(e.name) ? '#444' : e.color
                }
            }
        )
    }
})


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