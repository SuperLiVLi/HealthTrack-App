import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

function Dropdown({ options, onChange, placeholder = "Select an option" }) {
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState(placeholder);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleItemClick = (option) => {
        setSelected(option);
        setIsActive(false);
        onChange(option);
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-selected" onClick={() => setIsActive(!isActive)}>
                {selected}
            </div>
            {isActive && (
                <div className="dropdown-list">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`dropdown-item ${selected === option ? 'selected' : ''}`}
                            onClick={() => handleItemClick(option)}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#d5d5d5'} // Change to light grey on hover
                            onMouseOut={(e) => e.target.style.backgroundColor = '#fff'} // Change back to white when not hovered
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;
