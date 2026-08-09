import { useState } from "react";
import type { UseHookReturnType } from "./types";

const useHook = (): UseHookReturnType => {

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);

    return {
        ILightboxStates: {
            activeIndex,
            setActiveIndex, 
            show, 
            setShow
        }

    }
}

export default useHook;