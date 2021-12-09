import React from 'react';


import './App.css';
import Cube3D from "./cube3d/cube3d";

import {useRotation} from "./hooks/useRotation";
import {useCubeReducer} from "./hooks/useCubeReducer";
import {Operations} from "./operations/Operations";
import {useShortcuts} from "./hooks/useShortcuts";
import Layout from "./layout/layout";


function App() {
    const {rotateCubeX, rotateCubeY} = useRotation();
    const [cells, dispatch] = useCubeReducer();
    useShortcuts(dispatch);

    return (
        <div className="App">
            <Cube3D cells={cells}
                    rotate={{
                        rotateX: rotateCubeX,
                        rotateY: rotateCubeY,
                        rotateZ: 0
                    }}/>
            <Layout cells={cells}/>
            <Operations dispatch={dispatch}/>
        </div>
    );
}

export default App;
