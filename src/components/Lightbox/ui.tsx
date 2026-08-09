"use client";
import { type Props, type Options } from "./types";
import { memo } from "react";
import styles from "./styles.module.css";
import { defaultOptions, params } from "./data";
import useModel from "./model";

const UI = ({
    className = "",
    images,
    states,
    options = {}
}: Props) => {

    const _options: Options = { ...defaultOptions, ...options };
    const {
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
    } = useModel(states, images, _options);

    return (
        <div onWheel={handleWheel} className={`${styles.container} ${states.show ? styles.show : ''} ${className}`}>

            {images?.[states.activeIndex].title ? <h2 className={`${styles.title}`}>{images?.[states.activeIndex].title}</h2> : null}

            <div className={`${styles.header}`}>

                {_options?.zoomable && <>
                    <button type="button" className={`${styles.headerBtn} ${zoom <= params.minZoomLimit ? styles.disabled : ''}`} onClick={() => { setZoom((z) => Math.max(z - params.zoomNumber, params.minZoomLimit)); resetPlaying(); }}>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="zoom-out" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>
                    </button>

                    <button type="button" className={`${styles.headerBtn} ${zoom >= params.maxZoomLimit ? styles.disabled : ''}`} onClick={() => { setZoom((z) => Math.min(z + params.zoomNumber, params.maxZoomLimit)); resetPlaying(); }}>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="zoom-in" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>
                    </button>
                </>}

                {_options?.playable && <>
                    <button className={`${styles.headerBtn} ${playing ? styles.disabled : ''}`} onClick={play}>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="play-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M719.4 499.1l-296.1-215A15.9 15.9 0 00398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 000-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z"></path></svg>
                    </button>

                    <button className={`${styles.headerBtn} ${!playing ? styles.disabled : ''}`} onClick={pause}>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="pause-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-88-532h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zm224 0h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z"></path></svg>
                    </button>

                    <div
                        key={`${states.activeIndex}-${playing}`}
                        className={`${styles.playingLine} ${playing ? styles.playing : ''}`}
                        style={{
                            animationDuration: `${_options?.playingDuration ? _options.playingDuration / 1000 : 0}s`
                        }}
                    />
                </>}

                <button className={`${styles.headerBtn}`} onClick={() => { onClose(); }}>
                    <svg fillRule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path></svg>
                </button>

            </div>

            <button onClick={toPrev}
                className={`${styles.arrow} ${styles.arrowLeft}`}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
            </button>

            <img
                draggable={false}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    cursor: zoom > params.minZoomLimit ? (dragging ? "grabbing" : "grab") : "default",
                    transition: dragging ? 'none' : 'transform .2s ease'
                }}
                src={images?.[states.activeIndex].src}
                alt={images?.[states.activeIndex].alt}
                className={styles.img}
                onMouseDown={handleMouseDown}
            />

            <button onClick={toNext} className={`${styles.arrow} ${styles.arrowRight}`}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
            </button>

        </div>
    )

}

export default memo(UI);

