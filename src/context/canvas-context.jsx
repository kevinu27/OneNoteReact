import { createContext, useState, useReducer } from "react";

export const CanvasContext = createContext()

function canvasReducer(state, action) {
    console.log('canvas reducer')
    console.log('state', state)
    console.log('action', action)

    return {
        ...state,
        activeButton:action.payload.buttonId
    }
    
}


export default function CanvasContextProvider({children}) {

    function handleActiveButton(button) {
        canvasDispatch({
            type: 'ACTIVE_BUTTON',
            payload: button
        })
    }
   
    const [canvasState, canvasDispatch] = useReducer(canvasReducer,
        {
            activeButton: "" ,
        }
    )


    const [activeButton, setactiveButton] = useState("")

    const canvasContextValues = {
        activeButton: canvasState.activeButton,
        handleActiveButton: handleActiveButton
    }

    return (<CanvasContext.Provider value={canvasContextValues} >
            {children}
    </CanvasContext.Provider>)

}