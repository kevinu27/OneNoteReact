
import CanvasContextProvider from '../context/canvas-context.jsx'

const ButtonsContent = [
    "drawing",
    "stroke",
    
]

export default function Buttons() {


function onclickHandler(e, index){

console.log('click, e', e)
console.log('click, index', index)
setactiveButton(index)
}

    return(
        <CanvasContextProvider>
            {ButtonsContent.map( (button, index) => <button onClick={(e)=> onclickHandler(e, index)} key={index}> {button}</button> )}
        </CanvasContextProvider>
    )
}