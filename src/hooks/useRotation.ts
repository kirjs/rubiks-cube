import {useEffect, useRef, useState} from "react";

export function useRotation(){
    useEffect(() => {
        interface MouseMoveStatus {
            startX: number,
            startY: number,
            rotateX: number;
            rotateY: number;
        }
        let status: MouseMoveStatus|undefined;

        const pointerDownListener = (e: MouseEvent) => {
            status = {
                startX: e.clientX,
                startY: e.clientY,
                rotateX: rotateXRef.current,
                rotateY: rotateYRef.current,
            };

        };

        const pointerUpListener = () => {
            status = undefined;
        };


        const pointerMoveListener = (e: MouseEvent) => {
            if(status){
                const diffX = e.clientX - status.startX;
                const diffY = e.clientY - status.startY;
                setRotateCubeX(status.rotateX - diffY);
                setRotateCubeY(status.rotateY + diffX);
            }
        };
        document.body.addEventListener('pointerdown', pointerDownListener);
        document.body.addEventListener('pointerup', pointerUpListener);
        document.body.addEventListener('pointermove', pointerMoveListener);

        return () => {
            document.body.removeEventListener('pointerdown', pointerDownListener);
            document.body.removeEventListener('pointerup', pointerUpListener);
            document.body.removeEventListener('pointermove', pointerMoveListener);
        }
    }, []);


    const [rotateCubeX, setRotateCubeX] = useState(-30);
    const [rotateCubeY, setRotateCubeY] = useState(-30);

    const rotateXRef = useRef(rotateCubeX);
    rotateXRef.current = rotateCubeX;
    const rotateYRef = useRef(rotateCubeY);
    rotateYRef.current = rotateCubeY;

    return  {rotateCubeX, rotateCubeY}
}