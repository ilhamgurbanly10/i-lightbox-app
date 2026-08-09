import { useEffect, useRef, useState } from "react";
import type { UseModelReturnType, States, Images, Options, Position } from "./types";
import { params } from "./data";

const useModel = (states: States, images: Images, options: Options): UseModelReturnType => {

    const [position, setPosition] = useState<Position>({ x: 0, y: 0, });
    const [dragging, setDragging] = useState<boolean>(false);
    const start = useRef({ x: 0, y: 0, });
    const [zoom, setZoom] = useState<number>(params.initialZoom);
    const [playing, setPlaying] = useState<boolean>(false);

    // resetting
    const resetZoom = (): void => setZoom(params.initialZoom);
    const resetPlaying = (): void => setPlaying(params.initialPlaying);

    const resetPosition = (): void => {
        setPosition({ x: 0, y: 0, });
        start.current = { x: 0, y: 0, }
    }

    const onClose = (): void => {
        states.setShow(false);
        resetZoom();
        resetPlaying();
        resetPosition();
    }
    // end-resetting

    // dragging
    const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
        if (zoom <= params.minZoomLimit) return;

        setDragging(true);

        start.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    useEffect(() => {

        if (!dragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX - start.current.x,
                y: e.clientY - start.current.y,
            });
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);
    // end-dragging

    // playing
    const play = (): void => {
        resetZoom();
        resetPosition();
        setPlaying(true);
    }

    const pause = (): void => {
        setPlaying(false);
    }

    useEffect(() => {

        let timeout = null;

        if (playing) {
            timeout = setTimeout(() => {
                toNext();
            }, options.playingDuration)
        } else if (timeout) clearTimeout(timeout);

        return () => { if (timeout) clearTimeout(timeout); }

    }, [playing, states.activeIndex]);
    // end-playing

    // sliding
    const toPrev = (): void => {
        const prevIndex: number = states.activeIndex - 1;
        states.setActiveIndex(prevIndex < 0 ? images.length - 1 : prevIndex);
        resetZoom();
        resetPosition();
    }

    const toNext = (): void => {
        const nextIndex: number = states.activeIndex + 1;
        states.setActiveIndex(nextIndex > images.length - 1 ? 0 : nextIndex);
        resetZoom();
        resetPosition();
    }
    // end-sliding

    // zoom
    const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {

        resetPlaying();

        setZoom((prev) => {
            const next =
                e.deltaY < 0
                    ? prev + params.zoomNumber
                    : prev - params.zoomNumber;

            return Math.min(params.maxZoomLimit, Math.max(params.minZoomLimit, next));
        });
    };
    // end-zoom

    return {
        zoom,
        setZoom,
        onClose,
        toPrev,
        toNext,
        handleWheel,
        playing,
        play,
        pause,
        resetPlaying,
        handleMouseDown,
        position,
        dragging
    }
}

export default useModel;