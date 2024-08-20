
import { useContext } from 'react'
import CanvasContextProvider from '../context/canvas-context.jsx'
import {CanvasContext} from '../context/canvas-context.jsx'

const ButtonsContent = [
    {buttonId: "drawing", buttonType:'button'},
    {buttonId: "stroke", buttonType: 'select', options: ['Solid', 'Dashed', 'Dotted'] }
    
]

export default function Buttons() {
const {handleActiveButton} = useContext(CanvasContext)

function onclickHandler(e, index, button){

    console.log('click, e', e)
    console.log('click, index', index)
    handleActiveButton(button)
    }

    return(
        <>
            {ButtonsContent.map( (button, index) =>  button.buttonType == "button" ? <button onClick={(e)=> onclickHandler(e, index, button)} key={index}> {button.buttonId}</button> : null )}
            {ButtonsContent.map( (button, index) =>  button.buttonType == "select" ? <> <label>{button.buttonId}</label>  <select key={index} onChange={(e) => onclickHandler(e, index, button)}> {button.options.map((option, optionIndex) => ( <option key={optionIndex} value={option}> {option}</option>))}</select></> : null)}
        </>
    )
}