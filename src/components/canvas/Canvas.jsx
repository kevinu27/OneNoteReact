import './Canvas.css'
import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import {CanvasContext} from '../../context/canvas-context.jsx'
import { TabsContext } from '../../context/Tabs-context.jsx'

export default function Canvas() {

    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const linesRef = useRef([]); 
    const textBoxesRef = useRef([]); 

    const {activeButton, widthSlider, lineStyle, lineColor, setTextBoxes, setLines, loadLines, loadTextBoxes} = useContext(CanvasContext)
    const { activeTab } = useContext(TabsContext)
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    // se usa ref como estado en este caso, porque si se usase un estado el componenete se reejecutaria cada vez se mueve el rato dibujando y eso seria un consumo potente 
    // por demasiadas reejecuciones. Con el useRef se guarda ahi ya que el ref sobrevive los re-renders y no se pierde, y el useref no se reejecuta
    
    console.log('active tab en el canvas.jsx', activeTab)
    
    const draw = useCallback((ctx, activeTab) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000';
      ctx.lineCap = 'round';
      
      
        linesRef.current.forEach(line => {
          ctx.beginPath();
          line.forEach((point, index) => {
  
            if(point.tabIndex == activeTab.index){
            
            if (index === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineWidth = point.width;
              ctx.fillStyle = point.lineColor 
              ctx.strokeStyle = point.lineColor 
              
              if(point.lineStyle === 'Solid'){
                ctx.setLineDash([]);
              }else if(point.lineStyle === 'Dashed'){
  
                ctx.setLineDash([1, 15]);
              }else if(point.lineStyle === 'Dotted'){
  
                ctx.setLineDash([point.width, point.width+10]);
              }
              ctx.lineTo(point.x, point.y);
            }
          }
          });
          ///-------------------

          ctx.stroke();
        });
      
      //-------

  
    }, []);
  
    useEffect(() => {
      const canvas = canvasRef.current;

      const ctx = canvas.getContext('2d');
      console.log('useeffect')

      ////poner aqui el load del 
      let storedLines = JSON.parse(localStorage.getItem('tabs'));
      let storedTextBoxes = JSON.parse(localStorage.getItem('textBoxes'));
      console.log('storedLines***************', storedLines)
      console.log('storedTextBoxes************', storedTextBoxes)
      loadLines()
      loadTextBoxes()

      draw(ctx, activeTab);
    }, [draw, activeTab ]);
  
    const startDrawing = (e) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = e.nativeEvent;
      console.log('e.nativeEvent', e.nativeEvent)
      linesRef.current.push([{ x: offsetX, y: offsetY, width: widthSlider, lineStyle: lineStyle, lineColor: lineColor , tabIndex: activeTab.index }]);
      // textBoxesRef.current.push([{bottom:  height: left: right: top: width: x: y: , tabIndex: activeTab.index }]);
    };
  
    const stopDrawing = () => {
      setIsDrawing(false);
      setLines(linesRef.current)
      setTextBoxes(textBoxesRef.current)
    };
  
    const drawLine = (e) => {
      if (!isDrawing) return;
  
      const { offsetX, offsetY } = e.nativeEvent;
      const currentLine = linesRef.current[linesRef.current.length - 1];
      currentLine.push({ x: offsetX, y: offsetY, width: currentLine[currentLine.length - 1].width, lineStyle: currentLine[currentLine.length - 1].lineStyle, lineColor: currentLine[currentLine.length - 1].lineColor, tabIndex: activeTab.index});
      console.log('linesRef.current', linesRef.current)
      console.log('lineRef', linesRef)
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      draw(ctx, activeTab);
    };

    const setTextArea = (e) => {
      // if (!isDrawing) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { offsetX, offsetY } = e.nativeEvent;
      console.log('offsetX', offsetX)
      console.log('offsetY', offsetY)
      
      textBoxesRef.current = [

        ...textBoxesRef.current,
        {
          id: Date.now(),
          x: offsetX,
          y: offsetY,
          text: "",
          tabIndex: activeTab.index
        }
      ]
      forceUpdate();
      
      console.log('textBoxesRef.current*********', textBoxesRef.current)
      // draw(ctx, activeTab);
      
    };
    const handleTextChange = (id, newText) => {
      textBoxesRef.current = textBoxesRef.current.map((textbox) => 
        textbox.id === id ? { ...textbox, text: newText } : textbox
      );
      forceUpdate();
    };
  


return (

    
        <div className="App">
          {/* { activeButton ? <p>{activeButton}</p> : null}   */}
          {/* <p> widthSlider: {widthSlider}</p> */}
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={800}
                onMouseDown={activeButton ? startDrawing : setTextArea}
                onMouseUp={stopDrawing}
                onMouseMove={drawLine}
                onMouseLeave={stopDrawing}
                style={{ border: '1px solid black' }}
            >
            </canvas>      
                     
    {textBoxesRef.current.map((textbox) => 
      textbox.tabIndex === activeTab.index ? (
        <textarea
          key={textbox.id}
          style={{
            position: "absolute",
            left: `${textbox.x}px`,
            top: `${textbox.y}px`,
          }}
          value={textbox.text}
          onChange={(e) => handleTextChange(textbox.id, e.target.value)}
        />
      ) : null
    )}
        </div>
        
)
}