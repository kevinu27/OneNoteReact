import './Canvas.css'
// import { useState } from 'react'
// import { useEffect } from 'react';
import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import CanvasContextProvider from '../../context/canvas-context.jsx'
import {CanvasContext} from '../../context/canvas-context.jsx'

export default function Canvas() {

    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const linesRef = useRef([]); 

    const {activeButton, widthSlider} = useContext(CanvasContext)
    console.log('activeButton', activeButton)
    // se usa ref como estado en este caso, porque si se usase un estado el componenete se reejecutaria cada vez se mueve el rato dibujando y eso seria un consumo potente 
    // por demasiadas reejecuciones. Con el useRef se guarda ahi ya que el ref sobrevive los re-renders y no se pierde, y el useref no se reejecuta
  
  
    const draw = useCallback((ctx) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
  
      linesRef.current.forEach(line => {
        ctx.beginPath();
        line.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      });
    }, []);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      draw(ctx);
    }, [draw]);
  
    const startDrawing = (e) => {
      setIsDrawing(true);
      const { offsetX, offsetY } = e.nativeEvent;
      console.log('e.nativeEvent', e.nativeEvent)
      linesRef.current.push([{ x: offsetX, y: offsetY }]);
    };
  
    const stopDrawing = () => {
      setIsDrawing(false);
    };
  
    const drawLine = (e) => {
      if (!isDrawing) return;
  
      const { offsetX, offsetY } = e.nativeEvent;
      const currentLine = linesRef.current[linesRef.current.length - 1];
      currentLine.push({ x: offsetX, y: offsetY });
  
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      draw(ctx);
    };
  


return (

    
        <div className="App">
          { activeButton ? <p>{activeButton}</p> : null}
          <p> widthSlider: {widthSlider}</p>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={800}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={drawLine}
                onMouseLeave={stopDrawing}
                style={{ border: '1px solid black' }}
            />
        </div>
        
)
}