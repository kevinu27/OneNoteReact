import './Canvas.css'
// import { useState } from 'react'
// import { useEffect } from 'react';
import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import {CanvasContext} from '../../context/canvas-context.jsx'
import { TabsContext } from '../../context/Tabs-context.jsx'

export default function Canvas() {

    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const linesRef = useRef([]); 

    const {activeButton, widthSlider, lineStyle, lineColor} = useContext(CanvasContext)
    const { activeTab } = useContext(TabsContext)
    console.log('active tab en el canvas.jsx', activeTab)
    // se usa ref como estado en este caso, porque si se usase un estado el componenete se reejecutaria cada vez se mueve el rato dibujando y eso seria un consumo potente 
    // por demasiadas reejecuciones. Con el useRef se guarda ahi ya que el ref sobrevive los re-renders y no se pierde, y el useref no se reejecuta
  
    const draw = useCallback((ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000';
      ctx.lineCap = 'round';
      linesRef.current.forEach(line => {
        ctx.beginPath();
        line.forEach((point, index) => {
          // if(point.index == activeTab.index){

          
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
        // }
        });
        ctx.stroke();
      });
    }, []);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      console.log('useeffect')
      draw(ctx);
    }, [draw]);
  
    const startDrawing = (e) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = e.nativeEvent;
      console.log('e.nativeEvent', e.nativeEvent)
      linesRef.current.push([{ x: offsetX, y: offsetY, width: widthSlider, lineStyle: lineStyle, lineColor: lineColor  }]);
    };
  
    const stopDrawing = () => {
      setIsDrawing(false);
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
      draw(ctx);
    };
  


return (

    
        <div className="App">
          { activeButton ? <p>{activeButton}</p> : null}
          {/* <p> widthSlider: {widthSlider}</p> */}
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={800}
                onMouseDown={activeButton ? startDrawing : null}
                onMouseUp={stopDrawing}
                onMouseMove={drawLine}
                onMouseLeave={stopDrawing}
                style={{ border: '1px solid black' }}
            />
        </div>
        
)
}