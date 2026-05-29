import RestaurantCard from '../RestaurantCard/RestaurantCard'
import Category from '../Category/Category'
import { useEffect, useState } from 'react'
import './TabFavourites.css'
import FavouriteRestaurantCard from '../RestaurantCard/FavouriteRestaurantCard';
import FavouriteItem from '../FavouriteItem/FavouriteItem';

const STORAGE_KEY = 'restaurantReactions'

export default function TabFavourites() {
    const [toggleHusman, setToggleHusman] = useState(false);
    const [togglePizza, setTogglePizza] = useState(false);
    const [toggleHamburger, setToggleHamburger] = useState(false);
    const [toggleAsian, setToggleAsian] = useState(false);
    const [toggleLatin, setToggleLatin] = useState(false);
    const [toggleOriental, setToggleOriental] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [modalName, setModalName] = useState("");
    const [modalImgSrc, setModalImgSrc] = useState("");
    const [modalMapLink, setModalMapLink] = useState("");
    const [favourites, setFavourites] = useState([])

    const unLike = (restaurantName) => {
        const stored = localStorage.getItem(STORAGE_KEY)
        const parsed = stored ? JSON.parse(stored) : []
        const next = Array.isArray(parsed)
            ? parsed.filter((item) => item?.name !== restaurantName)
            : []

        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        setFavourites((current) => current.filter((item) => item?.name !== restaurantName))
    }

    const handleClick = (name, imageSrc, mapLink) => {
        setModalName(name);
        setModalImgSrc(imageSrc);
        setModalMapLink(mapLink);
        setShowModal(true);

    }

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        const parsed = stored ? JSON.parse(stored) : []
        const liked = Array.isArray(parsed)
            ? parsed.filter((item) => item?.reaction === 'like')
            : []

        setFavourites(liked)
    }, [])

    //On load, populate the ul with FavouriteItem-components from localStorage

    return (
        <>
            <div className="category-grid">
                <Category name="Husman" toggled={toggleHusman} toggler={setToggleHusman} />
                <Category name="Pizza" toggled={togglePizza} toggler={setTogglePizza} />
                <Category name="Hamburger" toggled={toggleHamburger} toggler={setToggleHamburger} />
                <Category name="Asian" toggled={toggleAsian} toggler={setToggleAsian} />
                <Category name="Latin" toggled={toggleLatin} toggler={setToggleLatin} />
                <Category name="Oriental" toggled={toggleOriental} toggler={setToggleOriental} />
            </div>
            <div className="restuarant-card">
                <ul className="favourites-list">
                    {favourites.map((item) => (
                        <FavouriteItem
                            name={item.name}
                            handleClick={() => handleClick(item.name, item.imageSrc, item.mapLink)}
                            onDelete={() => unLike(item.name)}
                        />
                    ))}
                </ul>
                <FavouriteRestaurantCard
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    name={modalName}
                    imageSrc={modalImgSrc}
                    mapLink={modalMapLink}
                />
            </div>
        </>
    )
}