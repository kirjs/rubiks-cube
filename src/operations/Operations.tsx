import {operations} from "../operations";
import React from "react";


export interface OperationsProps {
    dispatch:  (a: string) => void
}

export function Operations({dispatch}: OperationsProps) {
    return <>
        {Object.entries(operations).map(([name, action], i) => {
            return <button onClick={() => {
                dispatch(name);
            }} key={i}>{name}
            </button>
        })}
        <button onClick={() => {
            const o = Object.keys(operations);
            const i = Math.floor(Math.random() * o.length);
            dispatch(o[i]);
        }}>random
        </button>
    </>;
}