import SearchLocation from '../SearchLocation/SearchLocation'
import SearchRadius from '../SearchRadius/SearchRadius'
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import Category from '../Category/Category'
import { useState } from 'react'
import './TabSearch.css'

export default function TabSearch() {
    const [toggleHusman, setToggleHusman] = useState(false);
    const [togglePizza, setTogglePizza] = useState(false);
    const [toggleHamburger, setToggleHamburger] = useState(false);
    const [toggleAsian, setToggleAsian] = useState(false);
    const [toggleLatin, setToggleLatin] = useState(false);
    const [toggleOriental, setToggleOriental] = useState(false);

    return (
        <>
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
            <div className="restuarant-card">
                <h1>Restaurant card here...</h1>
            </div>
        </>
    )
}