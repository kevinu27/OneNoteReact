import { createContext, useState, useReducer } from "react";

export const CanvasContext = createContext()

function canvasReducer(state, action) {
    console.log('canvas reducer')
    console.log('statecanvasReducer', state)
    console.log('actioncanvasReducer-!_!_!_!_!_!!_!_!_!_', action)

    if(action.type == "ACTIVE_BUTTON"){
        console.log('ACTIVE_BUTTON')
        
            return {
                ...state,
                activeButton: action.payload ,
            }
   
     
    }

    if(action.type == "WIDTH_SLIDER"){
        console.log('WIDTH_SLIDER')
        return {
            ...state,
            widthSlider:action.payload.e,
        }
    }

    if(action.type == "STYLE_SELECT"){
        console.log('STYLE_SELECT', action.payload)
        return {
            ...state,
            lineStyle: action.payload,
        }
    }

    if(action.type == "COLOR_PICKER"){
        console.log('COLOR_PICKER', action.payload.target.value)
        return {
            ...state,
            lineColor: action.payload.target.value,
        }
    }
}


export default function CanvasContextProvider({children}) {

    function handleDrawingButton(button) {
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

    function handleSelectStyleValue(selectValue) {
        canvasDispatch({
            type: 'STYLE_SELECT',
            payload: selectValue
        })
    }

    function handleColorPickerValue(selectValue) {
        canvasDispatch({
            type: 'COLOR_PICKER',
            payload: selectValue
        })
    }
   
    const [canvasState, canvasDispatch] = useReducer(canvasReducer,
        {
            activeButton: false ,
            widthSlider: 5,
            lineStyle: 'Solid',
            lineColor: '#000000'
        }
    )



    const canvasContextValues = {
        activeButton: canvasState.activeButton,
        widthSlider: canvasState.widthSlider,
        lineStyle: canvasState.lineStyle,
        lineColor: canvasState.lineColor,
        handleDrawingButton: handleDrawingButton,
        handleSliderValue: handleSliderValue,
        handleSelectStyleValue: handleSelectStyleValue,
        handleColorPickerValue: handleColorPickerValue
    }

    return (<CanvasContext.Provider value={canvasContextValues} >
            {children}
    </CanvasContext.Provider>)

}