import './SearchRadius.css'
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function SearchRadius() {
    //https://www.geeksforgeeks.org/reactjs/react-bootstrap-range/
    const [sliderValue, setSliderValue] = useState(5);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
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