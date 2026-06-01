import SearchLocation from '../SearchLocation/SearchLocation'
import SearchRadius from '../SearchRadius/SearchRadius'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import Category from '../Category/Category'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import './TabSearch.css'
import { getDislikedReactions, getSearchRadius } from '../util.js'

export default function TabSearch() {
    const [toggleHusman, setToggleHusman] = useState(false);
    const [togglePizza, setTogglePizza] = useState(false);
    const [toggleHamburger, setToggleHamburger] = useState(false);
    const [toggleAsian, setToggleAsian] = useState(false);
    const [toggleLatin, setToggleLatin] = useState(false);
    const [toggleSpanish, setToggleSpanish] = useState(false);
    const [searchBtnState, setSearchBtnState] = useState(true);
    const [coords, setCoords] = useState({});
    const [results, setResults] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const toggledTypes = () => {
        //Tom lista för alla typer som ska med
        const restaurantTypes = [];
        //Kollar vilka som är ikryssade och sen lägger till.
        if (toggleAsian) {
            restaurantTypes.push("asian_restaurant");
        }
        if (togglePizza) {
            restaurantTypes.push("pizza_restaurant");
        }
        if (toggleHamburger) {
            restaurantTypes.push("hamburger_restaurant");
        }
        if (toggleLatin) {
            restaurantTypes.push("bar");
        }
        if (toggleSpanish) {
            restaurantTypes.push("spanish_restaurant");
        }
        if (toggleHusman) {
            restaurantTypes.push("scandinavian_restaurant");
        }
        //Om ingen blivit ikryssad så tar man bara de generiska.
        if (restaurantTypes.length === 0) {
            restaurantTypes.push("restaurant");
        }

        console.log("i Tabsearxh" + coords.latitude + " " + coords.longitude);
        return restaurantTypes;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    const categoryPriority = [
        { name: 'Husman', types: ['scandinavian_restaurant'] },
        { name: 'Pizza', types: ['pizza_restaurant'] },
        { name: 'Hamburger', types: ['hamburger_restaurant'] },
        { name: 'Asian', types: ['asian_restaurant'] },
        { name: 'Pubs', types: ['bar'] },
        { name: 'Spanish', types: ['spanish_restaurant'] },
    ]

    const getPrimaryCategory = (types = []) => {
        if (!Array.isArray(types)) {
            return ''
        }

        const match = categoryPriority.find((category) =>
            category.types.some((type) => types.includes(type))
        )

        return match ? match.name : ''
    }

    const formatDistance = (distanceMeters) => {
        if (!Number.isFinite(distanceMeters)) {
            return ''
        }

        if (distanceMeters < 1000) {
            return `${Math.round(distanceMeters)} m`
        }

        return `${(distanceMeters / 1000).toFixed(1)} km`
    }

    const formatDuration = (durationValue) => {
        if (!durationValue) {
            return ''
        }

        const seconds = Number(String(durationValue).replace('s', ''))
        if (!Number.isFinite(seconds) || seconds <= 0) {
            return ''
        }

        const minutes = Math.round(seconds / 60)
        if (minutes < 60) {
            return `${minutes} min`
        }

        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        return remainingMinutes > 0 ? `${hours} h ${remainingMinutes} min` : `${hours} h`
    }

    const searchClick = () => {
        setSearchBtnState(false);
        const restaurantTypes = toggledTypes(); //lägger listan av types i restaurantTypes
        makeApiCall(restaurantTypes); //makeApiCall tar emot typerna. 
    }


    const makeApiCall = async (restaurantTypes) => {
        try {
            //API call till googles search nearby (inte klart.) 
            const answer = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "places.displayName,places.photos,places.googleMapsUri,places.id,places.types,routingSummaries"
                },
                body: JSON.stringify({
                    "maxResultCount": 20,
                    "includedTypes": restaurantTypes,
                    "locationRestriction": { //Används för att begränsa området där man söker resturanger
                        "circle": {
                            "center": {
                                "latitude": coords.latitude,//Variabel från latitude i geolocation
                                "longitude": coords.longitude  //Variabel från longitude i geolocation
                            },
                            "radius": 1000 * getSearchRadius()
                        }
                    },
                    "routingParameters": {
                        "origin": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude
                        },
                        "travelMode": "WALK"
                    }
                })
            });

            const apiData = await answer.json();

            console.log("data: ", apiData);
            setCurrentIndex(0)
            const places = apiData.places || []
            const summaries = apiData.routingSummaries || []
            const dislikedNames = new Set(
                getDislikedReactions().map((item) => item?.name).filter(Boolean)
            )
            const mergedResults = places.map((place, index) => ({
                ...place,
                routingSummary: summaries[index] || null,
            }))
            const filteredResults = mergedResults.filter(
                (place) => !dislikedNames.has(place?.displayName?.text)
            )
            setResults(filteredResults)

        } catch (error) {
            window.alert("Kunde inte Nå google");
            console.error(error);
        } finally {
            setSearchBtnState(true); //"Sätt på" knappen igen. 
        }
    }

    const handleReaction = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    const currentRestaurant = results[currentIndex]

    //För att låsa upp bilden 

    let imgUrl = "";
    if (currentRestaurant && currentRestaurant.photos) {
        const photoId = currentRestaurant.photos[0].name;
        imgUrl = `https://places.googleapis.com/v1/${photoId}/media?key=${apiKey}&maxWidthPx=400`
        console.log(imgUrl);
    }
    //för att låsa upp maps till modalen då den förbjöd uri i iframe. 
    let embeddedMapUrl = "";
    if (currentRestaurant && currentRestaurant.id) {
        const restaurantId = currentRestaurant.id;
        embeddedMapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${restaurantId}`
    }

    const routingLeg = currentRestaurant?.routingSummary?.legs?.[0]
    const distanceText = formatDistance(routingLeg?.distanceMeters)
    const timeText = formatDuration(routingLeg?.duration)
    const category = getPrimaryCategory(currentRestaurant?.types)

    return (
        <div className="tab-search">
            <SearchLocation setCoords={setCoords} />
            <SearchRadius />
            <div className="category-grid">
                <Category name="Husman" toggled={toggleHusman} toggler={setToggleHusman} />
                <Category name="Pizza" toggled={togglePizza} toggler={setTogglePizza} />
                <Category name="Hamburger" toggled={toggleHamburger} toggler={setToggleHamburger} />
                <Category name="Asian" toggled={toggleAsian} toggler={setToggleAsian} />
                <Category name="Pubs" toggled={toggleLatin} toggler={setToggleLatin} />
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
                        distanceText={distanceText}
                        timeText={timeText}
                        imageSrc={imgUrl}
                        mapLink={embeddedMapUrl}
                        mapLinkUri={currentRestaurant.googleMapsUri}
                        category={category}
                        onReaction={handleReaction}
                    />
                ) : (
                    <p className="search-empty">
                        Inga restauranger finns
                    </p>
                )}
            </div>
        </div>
    )
}