import Canvas from './components/canvas/Canvas.jsx'
import Tabs from './components/Tabs.jsx'
import Buttons from './components/Buttons.jsx'
import { useContext } from 'react'
import CanvasContextProvider from './context/canvas-context.jsx'
import TabsContextProvider from './context/Tabs-context.jsx'

function App() {

  return (
    <TabsContextProvider>
    <CanvasContextProvider>

      <Buttons></Buttons>
      <Tabs></Tabs>
      <Canvas/>
    </CanvasContextProvider>
    </TabsContextProvider>

  );
}

export default App;