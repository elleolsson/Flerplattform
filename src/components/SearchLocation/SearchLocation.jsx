import { Button } from "react-bootstrap";
import './SearchLocation.css';
import { useState } from "react";

export default function SearchLocation() {

    //Funktion som händer varje gång en ändring hädner i adressens fält. (ska användas till mer grejer framöver).
    const addrInputChange = ()=>{
        setSaveButtonState(true);
    }
    /*Ny use state för en knapp som förbättrar användarupplevelsen genom att placeras vid 
    adressfältet och ändrar färg/text vid klick. Ger upplevelsen att svaret sparas.*/
    const [saveButtonState, setSaveButtonState] = useState(true); 
    return (
        <div className="search-location">
            <Button variant="info" size="sm">Använd min plats</Button>
            {/*<label htmlFor="location-input">Adress:</label>*/}
            <input type="text" name="" id="location-input" placeholder="Ange din adress här" onChange={addrInputChange}/>
            <Button
                variant={saveButtonState ? "info" : "dark"}
                onClick={()=>setSaveButtonState(false)}
                size="sm"
            >{saveButtonState ? "Spara" : "Sparat"}</Button>
        </div>
    )
}