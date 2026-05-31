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
    const [coords,setCoords] = useState({});
    const [results,setResults] = useState([]);
    const [currentIndex,setCurrentIndex] = useState(0);
    
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

        console.log("i Tabsearxh"+coords.latitude + " " + coords.longitude);
        return restaurantTypes;
    }

    const searchClick = ()=>{
        setSearchBtnState(false);
        const restaurantTypes = toggledTypes(); //lägger listan av types i restaurantTypes
        makeApiCall(restaurantTypes); //makeApiCall tar emot typerna. 
    }

    
    const makeApiCall= async (restaurantTypes)=>{
        try{
        //API call till googles search nearby (inte klart.) 
        const answer = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
            method: 'POST',
            headers:{
                "Content-Type" : "application/json",
                "X-Goog-Api-Key": "", //Ska implementera env fil. 
                "X-Goog-FieldMask": "places.displayName,places.photos,places.googleMapsUri,places.id" //Det vi vill få fram
            },
            body:JSON.stringify({
                "maxResultCount": 2,
                "includedTypes": restaurantTypes,
                "locationRestriction":{ //Används för att begränsa området där man söker resturanger
                    "circle":{
                        "center":{
                            "latitude": coords.latitude,//Variabel från latitude i geolocation
                            "longitude": coords.longitude  //Variabel från longitude i geolocation
                        },
                        "radius": 1000//Radie variabel från slidern ska va ggr 1000 för meter
                    }
                } 
            })   
        });

        const apiData = await answer.json();

        console.log("data: ", apiData);
        setCurrentIndex(0)
        setResults(apiData.places || []);

        }catch(error){
            window.alert("Kunde inte Nå google"); 
            console.error(error);     
        }finally{
            setSearchBtnState(true); //"Sätt på" knappen igen. 
        }
    }

    const handleReaction = () => {
        setCurrentIndex(currentIndex = currentIndex+1);
        console.log("CurrentIndex: " + currentIndex);
    }

    const currentRestaurant = results[currentIndex]

    //För att låsa upp bilden 

    let imgUrl = "";
    if(currentRestaurant && currentRestaurant.photos){
        const photoId = currentRestaurant.photos[0].name;
        const apiKey = ""; //ska implementera env fil här också 
        imgUrl = `https://places.googleapis.com/v1/${photoId}/media?key=${apiKey}&maxWidthPx=400`
        console.log(imgUrl);
    }
    //för att låsa upp maps till modalen då den förbjöd uri i iframe. 
    let embeddedMapUrl = "";
    if(currentRestaurant && currentRestaurant.id){
        const restaurantId = currentRestaurant.id;
        const apiKey = "";//ska implementera env fil här också 
        embeddedMapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${restaurantId}`
    }

    return (
        <div className="tab-search">
            <SearchLocation setCoords={setCoords}/>
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
                {currentRestaurant ? (
                    <RestaurantCard
                        name={currentRestaurant.displayName.text}
                        distanceText={{/* ska läggas in */}}
                        timeText={{/* ska läggas in */}}
                        imageSrc={imgUrl}
                        mapLink={embeddedMapUrl}
                        mapLinkUri={currentRestaurant.googleMapsUri}
                        onReaction={handleReaction}
                    />
                ):(
                    <p className="search-empty">
                        Inga restauranger finns
                    </p>
                )}
            </div>
        </div>
    )
}