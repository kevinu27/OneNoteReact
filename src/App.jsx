import Canvas from './components/canvas/Canvas.jsx'
import Tabs from './components/Tabs.jsx'
import Buttons from './components/Buttons.jsx'
import { useContext } from 'react'
import CanvasContextProvider from './context/canvas-context.jsx'

function App() {

  return (
    <CanvasContextProvider>
      <p>header</p>
      <Buttons></Buttons>
      <Tabs></Tabs>
      <Canvas/>
    </CanvasContextProvider>
  );
}

export default App;