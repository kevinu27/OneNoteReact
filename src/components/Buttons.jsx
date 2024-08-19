
import { useContext } from 'react'
import CanvasContextProvider from '../context/canvas-context.jsx'
import {CanvasContext} from '../context/canvas-context.jsx'

const ButtonsContent = [
    "drawing",
    "stroke",
    
]

export default function Buttons() {
const {setactiveButton} = useContext(CanvasContext)

function onclickHandler(e, index){

console.log('click, e', e)
console.log('click, index', index)
setactiveButton(index)
}

    return(
        <>
            {ButtonsContent.map( (button, index) => <button onClick={(e)=> onclickHandler(e, index)} key={index}> {button}</button> )}
        </>
    )
}