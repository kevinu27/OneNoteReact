
import { useContext } from 'react'
import CanvasContextProvider from '../context/canvas-context.jsx'
import {CanvasContext} from '../context/canvas-context.jsx'

const ButtonsContent = [
    {buttonId: "drawing", buttonType:'button'},
    {buttonId: "stroke", buttonType: 'select', options: ['Solid', 'Dashed', 'Dotted'] },
    {buttonId: "width", buttonType: 'slider', min: 0, max: 20, defaultValue: 20 }
    
]

export default function Buttons() {
const {handleActiveButton, handleSliderValue} = useContext(CanvasContext)

function onclickHandler(e, index, button){

    console.log('click, e', e)
    console.log('click, index', index)
    handleActiveButton(button)
    }
    function onSliderHandler(e, index, button) {
        console.log('onSliderHandler en button');
        console.log('click, e-----', e.target.value);
        console.log('click, index', index);
        console.log('click, button', button);
        handleSliderValue(button, e.target.value);
      }
    

    return(
        <>
            {ButtonsContent.map( (button, index) =>  button.buttonType == "button" ? <button onClick={(e)=> onclickHandler(e, index, button)} key={index}> {button.buttonId}</button> : null )}
            {ButtonsContent.map( (button, index) =>  button.buttonType == "select" ? <> <label>{button.buttonId}</label>  <select key={index} onChange={(e) => onclickHandler(e, index, button)}> {button.options.map((option, optionIndex) => ( <option key={optionIndex} value={option}> {option}</option>))}</select></> : null)}
            {ButtonsContent.map( (button, index) =>  button.buttonType == "slider" ?  <div key={index}> <label htmlFor={button.buttonId}>{button.buttonId}</label> <input type="range" id={button.buttonId} min={button.min} max={button.max} defaultValue={button.defaultValue} onChange={(e) => onSliderHandler(e, index, button)} /> </div> : null )}

        </>
    )
}