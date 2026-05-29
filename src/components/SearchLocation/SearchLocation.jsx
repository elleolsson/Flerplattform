import { Button } from "react-bootstrap";
import './SearchLocation.css';

export default function SearchLocation() {
    return (
        <div className="search-location">
            <Button variant="info" size="sm">Använd min plats</Button>
            {/*<label htmlFor="location-input">Adress:</label>*/}
            <input type="text" name="" id="location-input" placeholder="Ange din adress här" />
        </div>
    )
}