import SearchLocation from '../SearchLocation/SearchLocation'
import SearchRadius from '../SearchRadius/SearchRadius'
import RestaurantCard from '../RestaurantCard/RestaurantCard'


export default function TabSearch() {


    return (
        <>
            <SearchLocation />
            <SearchRadius />
            <div className="category-grid">
                <h1>TabSearch</h1>
            </div>
            <div className="restuarant-card">

            </div>
        </>
    )
}