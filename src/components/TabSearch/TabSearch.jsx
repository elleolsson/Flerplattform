import SearchLocation from '../SearchLocation/SearchLocation'
import SearchRadius from '../SearchRadius/SearchRadius'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import Category from '../Category/Category'
import { useState } from 'react'
import { Button } from "react-bootstrap";
import './TabSearch.css'

export default function TabSearch() {
    const [toggleHusman, setToggleHusman] = useState(false);
    const [togglePizza, setTogglePizza] = useState(false);
    const [toggleHamburger, setToggleHamburger] = useState(false);
    const [toggleAsian, setToggleAsian] = useState(false);
    const [toggleLatin, setToggleLatin] = useState(false);
    const [toggleOriental, setToggleOriental] = useState(false);

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
                <Category name="Oriental" toggled={toggleOriental} toggler={setToggleOriental} />
            </div>
            <Button variant='info'>SÖK</Button>
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