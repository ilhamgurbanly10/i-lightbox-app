import type { Dispatch, SetStateAction } from "react";

export interface States {
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

export interface UseHookReturnType {
    ILightboxStates: States;
}

export interface UseModelReturnType {
    zoom: number;
    setZoom: Dispatch<SetStateAction<number>>;
    onClose: () => void;
    toNext: () => void;
    toPrev: () => void;
    handleWheel: (e: React.WheelEvent<HTMLImageElement>) => void;
    playing: boolean;
    play: () => void;
    pause: () => void;
    resetPlaying: () => void;
    handleMouseDown: (e: React.MouseEvent<HTMLImageElement>) => void;
    position: Position;
    dragging: boolean;
}

export interface Params {
    maxZoomLimit: number;
    minZoomLimit: number;
    zoomNumber: number;
    initialZoom: number;
    initialPlaying: boolean;
}

export interface Img {
    alt?: string;
    src: string;
    title?: string;
}

export type Images = Img[];

export interface Props {
    className?: string;
    images: Images;
    states: States;
    options?: Options;
}

export interface Options {
    playable?: boolean;
    zoomable?: boolean;
    playingDuration?: number;
}

export interface Position { x: number, y: number };

