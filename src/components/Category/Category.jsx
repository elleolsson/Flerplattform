import { Button } from "react-bootstrap";
import { useState } from "react";

export default function Category({ name, toggled, toggler }) {
    const btnVariant = toggled ? "success" : "outline-info";
    function handleToggle() {
        toggler(!toggled);
    }

    return (
        <Button variant={btnVariant} onClick={handleToggle}>{name}</Button>
    )
}