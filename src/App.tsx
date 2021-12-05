import React from 'react';


import './App.css';
//
// import {
//     createCube,
//     reverseRotateMatrix,
//     rotate0,
//     rotateCube,
//     shift
// } from "./cube/helpers";
// import Cube from "./cube/Cube";
// import {CubeData, UpdateAction} from "./types";
// import {operations} from "./operations";
import Cube3D from "./cube3d/cube3d";


function App() {
    // const [lastAction, setLastAction] = useState<UpdateAction>();
    //
    // const [cube, dispatch] = useReducer((cube: CubeData, {operation, cycle, rotateMatrix}: UpdateAction) => {
    //     rotateMatrix = rotateMatrix || [rotate0, rotate0, rotate0, rotate0];
    //     const rotatedCube = rotateCube(cube, cycle, rotateMatrix);
    //     let shiftedCube = shift(rotatedCube, cycle, operation);
    //     return rotateCube(shiftedCube, cycle, reverseRotateMatrix(rotateMatrix));
    // }, createCube());
    //
    // let handleAction = (action: UpdateAction) => {
    //     dispatch(action);
    //     setLastAction(action);
    // };

    return (
        <div className="App">
            <Cube3D></Cube3D>
            {/*<Cube cube={cube} lastAction={lastAction}/>*/}
            {/*{Object.entries(operations).map(([name, action], i) => {*/}
            {/*    return <button onClick={() => handleAction(action)} key={i}>{name}*/}
            {/*    </button>*/}
            {/*})}*/}
        </div>
    );
}

export default App;
