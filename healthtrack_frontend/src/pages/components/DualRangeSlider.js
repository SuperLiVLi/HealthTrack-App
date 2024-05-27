import React, { useState, useEffect } from 'react';
import { Range, getTrackBackground } from 'react-range';
import "./DualRangeSlider.css";

const STEP = 0.5;
const MIN = 0;

const DualRangeSlider = ({ onChange, max = 100 }) => {
    const [values, setValues] = useState([MIN + (max - MIN) * 0.25, MIN + (max - MIN) * 0.75]);
    const [hovered, setHovered] = useState([false, false]);

    useEffect(() => {
        setValues([MIN + (max - MIN) * 0.25, MIN + (max - MIN) * 0.75]);
    }, [max]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '50%', marginLeft: '30px' }}>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={max}
                onChange={(values) => {
                    setValues(values);
                    onChange(values);
                }}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '20px',
                            display: 'flex',
                            width: '100%'
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: '10px',
                                background: getTrackBackground({
                                    values: values,
                                    colors: ['#d3d3d3', '#2DCE89', '#d3d3d3'],
                                    min: MIN,
                                    max: max
                                }),
                                alignSelf: 'center'
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, index }) => (
                    <div
                        {...props}
                        className={hovered[index] ? "ThumbShadow" : ""}
                        onMouseEnter={() => setHovered({ ...hovered, [index]: true })}
                        onMouseLeave={() => setHovered({ ...hovered, [index]: false })}
                        style={{
                            ...props.style,
                            height: '30px',
                            width: '30px',
                            borderRadius: '50%',
                            backgroundColor: '#FFF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: 'none',
                            outline: 'none'
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '-30px',
                                left: '50%',
                                transform: 'translate(-50%, 0)',
                                color: '#FFF',
                                fontWeight: 'bold',
                                backgroundColor: '#2DCE89',
                                padding: '2px 2px',
                                borderRadius: '20px',
                                fontFamily: '"Poppins", sans-serif',
                                visibility: hovered[index] ? 'visible' : 'hidden',
                                opacity: hovered[index] ? 1 : 0,
                                transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
                            }}
                        >
                            {values[index].toFixed(1)}
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default DualRangeSlider;

