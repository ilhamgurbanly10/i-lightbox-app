import type { Options, Params } from "./types";

export const defaultOptions: Options = {
    playable: true,
    zoomable: true, 
    playingDuration: 5000
}

export const params: Params = {
    maxZoomLimit: 5,
    minZoomLimit: 1, 
    zoomNumber: .2,
    initialZoom: 1, 
    initialPlaying: false
}