
import { useContext } from 'react'
import CanvasContextProvider from '../context/canvas-context.jsx'
import {CanvasContext} from '../context/canvas-context.jsx'

const ButtonsContent = [
    {buttonId: "drawing", buttonType:'button'},
    {buttonId: "stroke", buttonType:'select'}
    
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
            {ButtonsContent.map( (button, index) => <button onClick={(e)=> onclickHandler(e, index, button)} key={index}> {button.buttonId}</button> )}
        </>
    )
}