import SearchLocation from '../SearchLocation/SearchLocation'
import SearchRadius from '../SearchRadius/SearchRadius'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import Category from '../Category/Category'
import { use, useState } from 'react'
import { Button } from "react-bootstrap";
import './TabSearch.css'

export default function TabSearch() {
    const [toggleHusman, setToggleHusman] = useState(false);
    const [togglePizza, setTogglePizza] = useState(false);
    const [toggleHamburger, setToggleHamburger] = useState(false);
    const [toggleAsian, setToggleAsian] = useState(false);
    const [toggleLatin, setToggleLatin] = useState(false);
    const [toggleSpanish, setToggleSpanish] = useState(false);
    const [searchBtnState,setSearchBtnState] = useState(true);
    
    const toggledTypes = ()=>{
        //Tom lista för alla typer som ska med
        const restaurantTypes = [];
        //Kollar vilka som är ikryssade och sen lägger till.
        if(toggleAsian){
            restaurantTypes.push("asian_restaurant");
        }
        if(togglePizza){
            restaurantTypes.push("pizza_restaurant");
        }
        if(toggleHamburger){
            restaurantTypes.push("hamburger_restaurant");
        }
        if(toggleLatin){
            restaurantTypes.push("latin_american_restaurant");
        }
        if(toggleSpanish){
            restaurantTypes.push("spanish_restaurant");
        }
        if(toggleHusman){
            restaurantTypes.push("scandinavian_restaurant");
        }
        //Om ingen blivit ikryssad så tar man bara de generiska.
        if(restaurantTypes.length === 0){
            restaurantTypes.push("restaurant");
        }

    }

    const searchClick = ()=>{
        setSearchBtnState(false);
        toggledTypes();
        //makeApiCall();
    }

    
    const makeApiCall=()=>{
        try{
        //API call till googles search nearby (inte klart.) 
        const answer = fetch('https://places.googleapis.com/v1/places:searchNearby', {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json",
                "X-Goog-Api-Key": nyckeln, //Ska implementera env fil. 
                "X-Goog-FieldMask": "places.displayName,places.photos,place.googleMapsUri" //Det vi vill få fram
            },
            body:JSON.stringify({
                "maxResultCount": 1,
                "includedTypes": restaurantTypes,
                "locationRestiction":{ //Används för att begränsa området där man söker resturanger
                    "circle":{
                        "center":{
                            "latitude": null,//Variabel från latitude i geolocation
                            "longitude": null //Variabel från longitude i geolocation
                        },
                        "radius": 1//Radie variabel från slidern ska va ggr 1000 för meter
                    }
                } 
            })
        }

        )
        }catch{
            window.alert("Kunde inte Nå google"); 
        }finally{
            setSearchBtnState(true); //"Sätt på" knappen igen. 
        }
    }

    return (
        <div className="tab-search">
            <SearchLocation />
            <SearchRadius />
            <div className="category-grid">
                <Category name="Husman" toggled={toggleHusman} toggler={setToggleHusman} />
                <Category name="Pizza" toggled={togglePizza} toggler={setTogglePizza} />
                <Category name="Hamburger" toggled={toggleHamburger} toggler={setToggleHamburger} />
                <Category name="Asian" toggled={toggleAsian} toggler={setToggleAsian} />
                <Category name="Latin" toggled={toggleLatin} toggler={setToggleLatin} />
                <Category name="Spanish" toggled={toggleSpanish} toggler={setToggleSpanish} />
            </div>
            <Button
             variant={searchBtnState ? "info" : "dark"}
             onClick={searchClick}
            >SÖK</Button>
            <div className="restaurant-cards">
                {/* Endast exempel, ta bort... */}
                <RestaurantCard
                    name="Saffron Bistro"
                    distanceText="2 km"
                    timeText="15 min gångavstånd"
                    imageSrc="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                    mapLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.1082022231363!2d18.063240316199237!3d59.33459198165944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5e3f5f4b17%3A0x8c9f4a6c9bb5f1d8!2sStockholm!5e0!3m2!1sen!2sse!4v1716999999999"
                />
            </div>
        </div>
    )
}