import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import "./CanvasEditor.css";

const CanvasEditor = ({ selectedImage }) => {
    const canvasRef = useRef(null);
    const [canvasFabric, setCanvasFabric] = useState(null);

    useEffect(() => {
        const canvasInst = new fabric.Canvas(canvasRef.current, {
            width: 1500,
            height: 400,
        });
        setCanvasFabric(canvasInst);

        return () => {
            canvasInst.dispose();
        };
    }, []);

    useEffect(() => {
        if (!canvasFabric || !selectedImage) return;

        const imgElement = new Image();
        imgElement.crossOrigin = 'anonymous';

        imgElement.onload = () => {
            const img = new fabric.Image(imgElement);
            img.scaleToWidth(canvasFabric.width);
            img.scaleToHeight(canvasFabric.height);
            img.set({
                left: (canvasFabric.width - img.width) / 2,
                top: (canvasFabric.height - img.height) / 2,
            });
            canvasFabric.add(img);
            canvasFabric.sendToBack(img);
            canvasFabric.renderAll();
        };

        imgElement.src = selectedImage;

    }, [selectedImage, canvasFabric]);

    const handleText = () => {
        if (!canvasFabric) return;
        const text = new fabric.Textbox("Write Text", {
            width: 150,
            height: 150,
            fill: "orange",
            fontSize: "18",
            left: 700,
            top: 100,
        });
        canvasFabric.add(text).setActiveObject(text);
        canvasFabric.renderAll();
    };

    const addShape = (shapeType) => {
        let shape;
        switch (shapeType) {
            case "rectangle":
                shape = new fabric.Rect({
                    width: 150, height: 100, fill: "blue", left: 700, top: 150
                });
                break;
            case "circle":
                shape = new fabric.Circle({
                    radius: 50, fill: "green", left: 700, top: 150
                });
                break;
            case "triangle":
                shape = new fabric.Triangle({
                    width: 100, height: 100, fill: "red", left: 700, top: 150
                });
                break;
            case "polygon":
                shape = new fabric.Polygon([
                    { x: 200, y: 0 },
                    { x: 250, y: 50 },
                    { x: 200, y: 100 },
                    { x: 150, y: 50 },
                ], {
                    fill: "purple",
                    left: 700,
                    top: 150,
                });
                break;
            default:
                return;
        }
        canvasFabric.add(shape).setActiveObject(shape);
    };

    const handleDownload = () => {
        if (!canvasFabric) return;

        try {
            const dataUrl = canvasFabric.toDataURL({
                format: "png",
                quality: 1.0,
            });

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = "Canvas-Image.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error generating data URL:", error);
        }
    };

    return (
        <div>
            <h3>Canvas Editor</h3>
            <canvas ref={canvasRef} style={{ width: '100%' }} />
            <div className='btn-div'>
                <button className='edit-btn' onClick={handleText}>Add Text</button>
                <button className='edit-btn' onClick={() => addShape("rectangle")}>Add Rectangle</button>
                <button className='edit-btn' onClick={() => addShape("circle")}>Add Circle</button>
                <button className='edit-btn' onClick={() => addShape("triangle")}>Add Triangle</button>
                <button className='edit-btn' onClick={() => addShape("polygon")}>Add Polygon</button>
            </div>
            <button className='edit-btn' onClick={handleDownload}>Download Image</button>
        </div>
    );
}

export default CanvasEditor;
