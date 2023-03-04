import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrowing, setIsDrowing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = "red"
    context.lineWidth = 1
    contextRef.current = context;
  }, [])
  



  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrowing(true)

  }

  const finishDrowing =() => {
    contextRef.current.closePath()
    setIsDrowing(false)

  }
  const draw = ({nativeEvent}) => {
    if(!isDrowing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()

  }
  return (
    <div className="App">
      <canvas 
      onMouseDown={startDrawing}
      onMouseUp={finishDrowing}
      onMouseMove={draw}
      ref={canvasRef}
      />
    </div>
  );
}

export default App;
