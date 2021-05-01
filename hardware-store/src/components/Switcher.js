import React from 'react';

const Switcher = () => {

    const myFunction = () => {
        var element = document.body;
        element.classList.toggle("dark-mode");
    }

    return (
        <label id="switch" className="switch">
            <input type="checkbox" onClick={() => myFunction()} id="slider" />
            <span className="slider round"></span>
        </label>
    )
};

export default Switcher;