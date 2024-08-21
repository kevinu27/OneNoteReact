
import { useContext } from 'react'
import CanvasContextProvider from '../context/canvas-context.jsx'
import {CanvasContext} from '../context/canvas-context.jsx'

const ButtonsContent = [
    {buttonId: "drawing", buttonType:'button'},
    {buttonId: "stroke", buttonType: 'select', options: ['Solid', 'Dashed', 'Dotted'] },
    {buttonId: "Linewidth", buttonType: 'slider', min: 0, max: 20, defaultValue: 20 },
    {buttonId: "color", buttonType: 'color' }

    
    
]

export default function Buttons() {
const {handleActiveButton, handleSliderValue, widthSlider, handleSelectStyleValue, handleColorPickerValue} = useContext(CanvasContext)

    function onclickHandler(e, index, button){

        console.log('click, e', e.target.value)
        console.log('click, index', index)
        handleActiveButton(button)
    }

    function onSliderHandler(e, index, button) {
        handleSliderValue(button, e.target.value);
      }

    function onSelectStrokeStyleHandler(e, index, button) {
        console.log('slect', e)
        handleSelectStyleValue(e.target.value);
    }

    function onColorPickerHandler(color) {

        handleColorPickerValue(color);
    }
    

    return(
        <>
            {ButtonsContent.map( (button, index) =>  button.buttonType == "button" ? <button onClick={(e)=> onclickHandler(e, index, button)} key={index}> {button.buttonId}</button> : null )}
            {ButtonsContent.map( (button, index) =>  button.buttonType == "select" ? <> <label>{button.buttonId}</label>  <select key={index} onChange={(e) => onSelectStrokeStyleHandler(e, index, button)}> {button.options.map((option, optionIndex) => ( <option key={optionIndex} value={option}> {option}</option>))}</select></> : null)}
            {ButtonsContent.map( (button, index) =>  button.buttonType == "slider" ?  <div key={index}> <label htmlFor={button.buttonId}>{button.buttonId}: {widthSlider} </label> <input type="range" id={button.buttonId} min={button.min} max={button.max} defaultValue={button.defaultValue} onChange={(e) => onSliderHandler(e, index, button)} /> </div> : null )}
            {ButtonsContent.map( (button, index) =>  button.buttonType == "color" ?  <div key={index}> <label htmlFor={button.buttonId}>{button.buttonId}: {widthSlider} </label> <input type="color" id={button.buttonId}  value={"#000000"} onChange={(e) => onColorPickerHandler(e, index, button)} /> </div> : null )}

            {/* <input type="color" id="colorPicker"> */}
        </>
    )
} 