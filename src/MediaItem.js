import React, { useEffect, useRef, useState } from "react";

const MediaItem = ({ id, src, canvasRect, onDeleteItem }) => {
    const resizableRef = useRef();
    const [width, setWidth] = useState(218);
    const [height, setHeight] = useState(124);
    const [top, setTop] = useState(canvasRect.top + 10);
    const [left, setLeft] = useState(canvasRect.left + 10);

    const [mouseDown, setMouseDown] = useState({
        isDragging: false,
        offsetX: 0,
        offsetY: 0
    });

    useEffect(() => {
        const observer = new ResizeObserver((data) => {
            const resizeData = data[0];

            const {
                inlineSize: width,
                blockSize: height
            } = resizeData.borderBoxSize[0];

            setWidth(width);
            setHeight(height);
        });

        observer.observe(resizableRef.current);

        return () => observer.disconnect();
    }, []);

    const handleLoadedMetadata = (e) => {
        // don't know if I need it yet
        // const { videoHeight, videoWidth } = e.target;
    };

    const handleMouseUp = (e) => {
        setMouseDown({ isDragging: false, offsetX: 0, offsetY: 0 });
    };

    const handleMouseLeave = (e) => {
        setMouseDown({ isDragging: false, offsetX: 0, offsetY: 0 });
    };

    const handleMouseDown = (e) => {
        e.stopPropagation();

        if (mouseDown.isDragging) {
            setMouseDown({ isDragging: false, offsetX: 0, offsetY: 0 });
            return;
        }

        const elementRect = e.target.getBoundingClientRect();

        const spacerForResizeDrag = { width: 20, height: 20 };

        // make sure the cursor is not in 20x20 bottom right corner
        // since that corner is for resizing functionality and
        // we don't want to track mouse down event for that case

        const inWidth =
            e.pageX > elementRect.right - spacerForResizeDrag.width &&
            e.pageX < elementRect.right;
        const inHeight =
            e.pageY > elementRect.bottom - spacerForResizeDrag.height &&
            e.pageY < elementRect.height;

        const isClickTargetInsideElement = !(inWidth && inHeight);

        if (isClickTargetInsideElement) {
            // offset is x, y distance between top left corner of the video/image
            // and mouse x, y  when the target was clicked.
            const offsetX = e.pageX - elementRect.left;
            const offsetY = e.pageY - elementRect.top;
            setMouseDown({ isDragging: true, offsetX, offsetY });
        }
    };

    const handleItemLoadError = (e) => {
        console.log("Error loading an asset: ", e);
        onDeleteItem(e.target.id);
    };

    const onMouseMove = (e) => {
        if (mouseDown.isDragging) {
            const newTop = e.pageY - mouseDown.offsetY;
            const newLeft = e.pageX - mouseDown.offsetX;

            const newRight = newLeft + width;
            const newBottom = newTop + height;

            const inWidth =
                newLeft >= canvasRect.left && newRight <= canvasRect.right;
            const inHeight =
                newTop >= canvasRect.top && newBottom <= canvasRect.bottom;

            if (inWidth && inHeight) {
                setTop(newTop);
                setLeft(newLeft);
            }
        }
    };

    // prevents default drag and drop
    // behaviour for images
    const handleDragStart = (e) => {
        e.preventDefault();
    };

    return (
        <div
            ref={resizableRef}
            id="resizable"
            className="resizable"
            style={{ width, height, top, left }}
        >
            {src.endsWith(".mp4") ? (
                <video
                    onMouseMove={onMouseMove}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    id={id}
                    onClick={(e) => e.preventDefault()}
                    className="video"
                    onLoadedMetadata={handleLoadedMetadata}
                    onError={handleItemLoadError}
                    controls
                    preload="metadata"
                >
                    <source src={src} type="video/mp4" />
                    Video not supported.
                </video>
            ) : (
                <img
                    onDragStart={handleDragStart}
                    onMouseMove={onMouseMove}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    id={id}
                    className="video"
                    onLoadedMetadata={handleLoadedMetadata}
                    onError={handleItemLoadError}
                    src={src}
                    alt="Broken Image"
                />
            )}
        </div>
    );
};

export default MediaItem;
