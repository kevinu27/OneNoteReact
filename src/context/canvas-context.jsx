import { createContext, useState, useReducer } from "react";

export const CanvasContext = createContext()

function canvasReducer(state, action) {
    console.log('canvas reducer')
    console.log('state', state)
    console.log('action', action)

    if(action.type == "ACTIVE_BUTTON"){
        console.log('ACTIVE_BUTTON')

    }

    if(action.type == "WIDTH_SLIDER"){
        console.log('WIDTH_SLIDER')
    }

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
    function handleSliderValue(sliderValue, e) {
        canvasDispatch({
            type: 'WIDTH_SLIDER',
            payload: {sliderValue, e}
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
        handleActiveButton: handleActiveButton,
        handleSliderValue: handleSliderValue
    }

    return (<CanvasContext.Provider value={canvasContextValues} >
            {children}
    </CanvasContext.Provider>)

}