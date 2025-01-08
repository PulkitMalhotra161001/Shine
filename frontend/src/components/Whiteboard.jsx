import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteWhiteboard,
  fetchWhiteboard,
  saveWhiteboard,
  updateWhiteboard,
} from "../utils/api";

const Whiteboard = ({ whiteboardId }) => {
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(5);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const navigate = useNavigate();

  //
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = penColor;
    context.lineWidth = penSize;
    contextRef.current = context;

    if (whiteboardId) {
      loadWhiteboard();
    }
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

  const loadWhiteboard = async () => {
    try {
      const whiteboard = await fetchWhiteboard(whiteboardId);
      if (whiteboard.data) {
        const img = new Image();
        img.src = whiteboard.data;
        img.onload = () => {
          const canvas = canvasRef.current;
          const context = contextRef.current;
          context.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
          context.drawImage(img, 0, 0, canvas.width, canvas.height); //draw the image
        };
      } else {
        console.warn("No image data found for this whiteboard");
      }
    } catch (error) {
      console.error("Failed to load whiteboard:", error);
    }
  };

  const saveCurrentWhiteboard = async () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    try {
      const res = await saveWhiteboard({ name: "Guest User", data: imageData });
      navigate(`meeting/${res.whiteboard._id}`, { replace: true });
    } catch (error) {
      console.error("Failed to save whiteboard:", error);
    }
  };

  const updateCurrentWhiteboard = async () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    try {
      await updateWhiteboard({
        id: whiteboardId,
        name: "Guest User",
        data: imageData,
      });
      alert("Updated successfully!");
    } catch (error) {
      console.error("Failed to update whiteboard:", error);
    }
  };

  const deleteCurrentWhiteboard = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this whiteboard?"
    );
    if (!confirmDelete) return;

    try {
      await deleteWhiteboard(whiteboardId);
      navigate(`/`, { replace: true });
    } catch (error) {
      console.error("Failed to delete whiteboard:", error);
    }
  };

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
            onClick={updateCurrentWhiteboard}
            className="px-4 py-2 bg-blue-700 text-white rounded shadow"
          >
            Update
          </button>
        ) : (
          <button
            onClick={saveCurrentWhiteboard}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
          >
            Save
          </button>
        )}

        {whiteboardId && (
          <button
            onClick={deleteCurrentWhiteboard}
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
