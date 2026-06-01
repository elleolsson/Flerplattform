import { Button } from "react-bootstrap";
import './SearchLocation.css';
import { useState } from "react";

export default function SearchLocation({ setCoords }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    const [addressInput, setAddressInput] = useState('')
    const [isSaving, setIsSaving] = useState(false)

    //Funktion som händer varje gång en ändring hädner i adressens fält. (ska användas till mer grejer framöver).
    const addrInputChange = (event) => {
        setAddressInput(event.target.value)
        setSaveButtonState(true);
    }

    const [myLocBtnState, setMyLocBtnState] = useState(true)
    const getPos = () => {
        setMyLocBtnState(false); //"Stänger av" knappen
        //till geolocation för att hämta plats: 
        const options = {
            enableHighAccuracy: true, //För att få mest exakt kordinat vilket är viktigt för att räkna ut exv gångavstånd.  
            timeout: 5000, //Får inte vänta för länge och hänga upp sig. 
            maximumAge: 0 //Gör så att det måste komma in en ny plats och inte en gammal.  
        };

        function success(position) {
            //Hämtar datorn/mobilens plats. (ska skickas till tabsearch sen)
            const cord = position.coords;
            setCoords(cord); //Settar det man får av geolocation. 

            const lat = cord.latitude; //Ska ges till api 
            const long = cord.longitude; //-II-

            console.log("lat: " + lat + "long: " + long);

        }
        function error(error) {
            console.log(error);
            setMyLocBtnState(true); //"Sätter på" knapp igen. 
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    /*Ny use state för en knapp som förbättrar användarupplevelsen genom att placeras vid 
    adressfältet och ändrar färg/text vid klick. Ger upplevelsen att svaret sparas.*/
    const [saveButtonState, setSaveButtonState] = useState(true);
    const saveLabel = isSaving ? "Sparar..." : (saveButtonState ? "Spara" : "Sparat")
    const canSave = Boolean(addressInput.trim()) && !isSaving

    const fetchAutocomplete = async (inputValue) => {
        const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'suggestions.placePrediction.text,suggestions.placePrediction.placeId'
            },
            body: JSON.stringify({
                input: inputValue
            })
        })

        return response.json()
    }

    const fetchPlaceLocation = async (placeId) => {
        const response = await fetch(
            `https://places.googleapis.com/v1/places/${placeId}?fields=location`,
            {
                headers: {
                    'X-Goog-Api-Key': apiKey
                }
            }
        )

        return response.json()
    }

    const handleSave = async () => {
        if (!canSave) {
            return
        }

        setIsSaving(true)
        try {
            const autocomplete = await fetchAutocomplete(addressInput.trim())
            const firstSuggestion = autocomplete?.suggestions?.[0]?.placePrediction
            if (!firstSuggestion?.placeId) {
                window.alert('Kunde inte hitta adressen.')
                return
            }

            if (firstSuggestion.text?.text) {
                setAddressInput(firstSuggestion.text.text)
            }

            const placeDetails = await fetchPlaceLocation(firstSuggestion.placeId)
            const location = placeDetails?.location
            if (!location?.latitude || !location?.longitude) {
                window.alert('Kunde inte hitta koordinaterna.')
                return
            }

            setCoords({
                latitude: location.latitude,
                longitude: location.longitude
            })
            setSaveButtonState(false)
        } catch (error) {
            console.error(error)
            window.alert('Kunde inte nå Google Maps.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            await handleSave()
        }
    }
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
                onKeyDown={handleKeyDown}
                value={addressInput}
            />
            <Button
                variant={saveButtonState ? "info" : "dark"}
                onClick={handleSave}
                disabled={!canSave}
                size="sm"
            >{saveLabel}</Button>
        </div>
    )
}