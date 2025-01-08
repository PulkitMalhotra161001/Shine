import React, { useEffect, useRef, useState } from "react";

const Whiteboard = ({ whiteboardId }) => {
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(5);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = penColor;
    context.lineWidth = penSize;
    contextRef.current = context;

  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = penColor;
    }
  }, [penColor]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.lineWidth = penSize;
    }
  }, [penSize]);


  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="mb-4 flex items-center space-x-4">
        {/* Color Picker */}
        <label className="flex items-center space-x-2">
          <span>Color:</span>
          <input
            type="color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
            className="w-10 h-10 border rounded"
          />
        </label>
        {/* Pen Size */}
        <label className="flex items-center space-x-2">
          <span>Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={penSize}
            onChange={(e) => setPenSize(Number(e.target.value))}
            className="w-32"
          />
          <span>{penSize}px</span>
        </label>
        {/* Eraser */}
        <button
          onClick={() => setPenColor("#FFFFFF")} // Set pen color to white for erasing
          className="px-4 py-2 bg-gray-200 text-black rounded shadow"
        >
          Eraser
        </button>
        {/* Clear Canvas */}
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded shadow"
        >
          Clear
        </button>
        {/* Save Canvas */}
        {whiteboardId ? (
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded shadow"
          >
            Update
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            Save
          </button>
        )}

        {whiteboardId && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded shadow"
          >
            Delete
          </button>
        )}
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing} // Stop drawing if the mouse leaves the canvas
        className="w-full h-full bg-white border"
      />
    </div>
  );
};

export default Whiteboard;
