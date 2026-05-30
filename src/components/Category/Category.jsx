import { Button } from "react-bootstrap";
import { useState } from "react";
import './Category.css';

export default function Category({ name, toggled, toggler }) {
    const btnVariant = toggled ? "success" : "outline-info";
    function handleToggle() {
        toggler(!toggled);
    }

    return (
        <Button className="no-hover" variant={btnVariant} onClick={handleToggle}>{name}</Button>
    )
}