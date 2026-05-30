import './SearchRadius.css'
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { getSearchRadius, setSearchRadius } from '../util'

export default function SearchRadius() {
    //https://www.geeksforgeeks.org/reactjs/react-bootstrap-range/
    const [sliderValue, setSliderValue] = useState(() => getSearchRadius(5))

    const handleSliderChange = (e) => {
        const nextValue = Number(e.target.value);
        setSliderValue(nextValue);
        setSearchRadius(nextValue);
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