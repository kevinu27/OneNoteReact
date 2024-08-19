import { createContext, useState } from "react";

export const CanvasContext = createContext()

export default function CanvasContextProvider({children}) {

    const [activeButton, setactiveButton] = useState("")

    const canvasContextValues = {
        activeButton,
        setactiveButton
    }

    return (<CanvasContext.Provider value={canvasContextValues} >
            {children}
    </CanvasContext.Provider>)

}