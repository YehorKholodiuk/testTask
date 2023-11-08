import React, { useEffect, useRef, useState } from "react";
import MediaItem from "./MediaItem";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";

const Canvas = () => {
    // https://www.videoplaceholder.com/
    // https://placekitten.com/300/200
    // https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
    const [items, setItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const onAddItem = (url = "") => {
        setItems([...items, { id: `video_${uuidv4()}`, src: url }]);
    };
    const onDeleteItem = (id) => {
        setItems(items.filter((item) => !item.id === id));
        setErrorMessage("Error loading an asset");
        setTimeout(() => setErrorMessage(""), 3000);
    };

    const [canvasRect, setCanvasRect] = useState({
        width: 1080,
        height: 640
    });

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvasBoundaries = canvasRef.current.getBoundingClientRect();
        setCanvasRect((state) => ({
            ...state,
            top: canvasBoundaries.top,
            left: canvasBoundaries.left,
            right: canvasBoundaries.right,
            bottom: canvasBoundaries.bottom
        }));
    }, []);

    return (
        <>
            <Input onAddItem={onAddItem} errorMessage={errorMessage} />
            <div id="app" className="canvas-container">
                <div
                    id="canvas"
                    className="canvas"
                    ref={canvasRef}
                    style={{ width: canvasRect.width, height: canvasRect.height }}
                >
                    Canvas
                </div>
                {items.map(({ id, src }) => {
                    return (
                        <MediaItem
                            key={id}
                            id={id}
                            src={src}
                            canvasRect={canvasRect}
                            onDeleteItem={onDeleteItem}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Canvas;
