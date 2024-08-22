
import { useContext } from 'react'
import CanvasContextProvider from '../context/canvas-context.jsx'
import {CanvasContext} from '../context/canvas-context.jsx'
import './Buttons.css'

const ButtonsContent = [
    {buttonId: "drawing", buttonType:'button'},
    {buttonId: "stroke", buttonType: 'select', options: ['Solid', 'Dashed', 'Dotted'] },
    {buttonId: "Linewidth", buttonType: 'slider', min: 0, max: 20, defaultValue: 5 },
    {buttonId: "color", buttonType: 'color' }

    
    
]

export default function Buttons() {
const {handleDrawingButton, handleSliderValue, widthSlider, handleSelectStyleValue, handleColorPickerValue, activeButton, lineColor} = useContext(CanvasContext)

    function onclickHandler(e, index, button){

        console.log('click, e', e.target.value)
        console.log('click, index', index)
        handleDrawingButton(!activeButton)
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
    
    console.log('activeButton******', activeButton)

    return(
        <>
            <div className='buttons-row'>
                {ButtonsContent.map( (button, index) =>  button.buttonType == "button" ? <button className={activeButton ? 'boton-activado':'boton-desactivado'} onClick={(e)=> onclickHandler(e, index, button)} key={index}> {button.buttonId}</button> : null )}
                {ButtonsContent.map( (button, index) =>  button.buttonType == "select" ? <> <label>{button.buttonId}</label>  <select key={index} onChange={(e) => onSelectStrokeStyleHandler(e, index, button)}> {button.options.map((option, optionIndex) => ( <option key={optionIndex} value={option}> {option}</option>))}</select></> : null)}
                {ButtonsContent.map( (button, index) =>  button.buttonType == "slider" ?  <div key={index}> <label htmlFor={button.buttonId}>{button.buttonId}: {widthSlider} </label> <input type="range" id={button.buttonId} min={button.min} max={button.max} defaultValue={button.defaultValue} onChange={(e) => onSliderHandler(e, index, button)} /> </div> : null )}
                {ButtonsContent.map( (button, index) =>  button.buttonType == "color" ?  <div key={index}> <label htmlFor={button.buttonId}>{button.buttonId} </label> <input type="color" id={button.buttonId}  value={lineColor} onChange={(e) => onColorPickerHandler(e, index, button)} /> </div> : null )}
            </div>
        </>
    )
} 