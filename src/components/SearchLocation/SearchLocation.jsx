import { Alert, Button } from "react-bootstrap";
import './SearchLocation.css';
import { useState } from "react";

export default function SearchLocation() {

    //Funktion som händer varje gång en ändring hädner i adressens fält. (ska användas till mer grejer framöver).
    const addrInputChange = ()=>{
        setSaveButtonState(true);
    }

    const [myLocBtnState,setMyLocBtnState] = useState(true)
    const getPos = ()=>{
        setMyLocBtnState(false); //"Stänger av" knappen
        //till geolocation för att hämta plats: 
        const options = {
            enableHighAccuracy: true, //För att få mest exakt kordinat vilket är viktigt för att räkna ut exv gångavstånd.  
            timeout:5000, //Får inte vänta för länge och hänga upp sig. 
            maximumAge:0 //Gör så att det måste komma in en ny plats och inte en gammal.  
        };

        function success(position){
            //Hämtar datorn/mobilens plats. (ska skickas till tabsearch sen)
            const cord = position.coords;
            const lat = cord.latitude; //Ska ges till api 
            const long = cord.longitude; //-II-

            console.log("lat: " + lat + "long: " + long);
            
        }
        function error(error){
            console.log(error);
            setMyLocBtnState(true); //"Sätter på" knapp igen. 
        }
        navigator.geolocation.getCurrentPosition(success,error,options);
    }

    /*Ny use state för en knapp som förbättrar användarupplevelsen genom att placeras vid 
    adressfältet och ändrar färg/text vid klick. Ger upplevelsen att svaret sparas.*/
    const [saveButtonState, setSaveButtonState] = useState(true); 
    return (
        <div className="search-location">
            <Button
                variant={myLocBtnState ? "info" : "dark"}
                size="sm"
                onClick={getPos}
            >Använd min plats</Button>
            {/*<label htmlFor="location-input">Adress:</label>*/}
            <input
                type="text" 
                name="" 
                id="location-input" 
                placeholder="Ange din adress här" 
                onChange={addrInputChange}
            />
            <Button
                variant={saveButtonState ? "info" : "dark"}
                onClick={()=>setSaveButtonState(false)}
                size="sm"
            >{saveButtonState ? "Spara" : "Sparat"}</Button>
        </div>
    )
}