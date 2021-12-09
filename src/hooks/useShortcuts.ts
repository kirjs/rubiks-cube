import {map} from "../common/actions";
import {useEffect} from "react";

export function useShortcuts(dispatch: (action: string)=> void) {
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            const key = e.code.replace('Key', '') + (e.shiftKey ? 'S' : '');
            if (map[key]) {
                dispatch(key);
            }
        };
        document.body.addEventListener('keydown', listener);
        return () => {
            document.body.removeEventListener('keydown', listener);
        }
    }, [dispatch]);
}
