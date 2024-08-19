import { createContext, useState } from "react";

export const CanvasContext = createContext({
    activeButton: ""

})

export default function CanvasContextProvider({children}) {

    const[activeButton, setactiveButton] = useState()





    const canvasContextValues = {
        activeButton: ""
    }

    return <CanvasContext.Provider value={canvasContextValues} >
            {children}
    </CanvasContext.Provider>

}