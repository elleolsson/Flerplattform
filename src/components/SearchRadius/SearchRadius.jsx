import './SearchRadius.css'
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function SearchRadius() {
    //https://www.geeksforgeeks.org/reactjs/react-bootstrap-range/
    const [sliderValue, setSliderValue] = useState(() => {
        //När SearchRadius skapas, läser vi först från localStorage om det redan fanns ett värde
        const savedValue = localStorage.getItem('searchRadius')
        const parsedValue = Number(savedValue)
        //Annars är 5 km default
        return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 5
    })

    const handleSliderChange = (e) => {
        const nextValue = Number(e.target.value);
        setSliderValue(nextValue);
        localStorage.setItem('searchRadius', String(nextValue));
    };

    return (
        <div className="search-radius">
            <Form.Label>
                Sökradie: {sliderValue} km
            </Form.Label>
            <Form.Range value={sliderValue} max="20" onChange={handleSliderChange} />

        </div>
    )
}