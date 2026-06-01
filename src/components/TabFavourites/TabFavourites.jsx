import Category from '../Category/Category'
import { useEffect, useMemo, useState } from 'react'
import './TabFavourites.css'
import FavouriteRestaurantCard from '../RestaurantCard/FavouriteRestaurantCard';
import FavouriteItem from '../FavouriteItem/FavouriteItem';
import { getLikedReactions, removeReaction } from '../util'

export default function TabFavourites() {
    const [toggleHusman, setToggleHusman] = useState(false);
    const [togglePizza, setTogglePizza] = useState(false);
    const [toggleHamburger, setToggleHamburger] = useState(false);
    const [toggleAsian, setToggleAsian] = useState(false);
    const [togglePubs, setTogglePubs] = useState(false);
    const [toggleSpanish, setToggleSpanish] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [modalName, setModalName] = useState("");
    const [modalImgSrc, setModalImgSrc] = useState("");
    const [modalMapLink, setModalMapLink] = useState("");
    const [favourites, setFavourites] = useState([])

    const unLike = (restaurantName) => {
        removeReaction(restaurantName)
        setFavourites((current) => current.filter((item) => item?.name !== restaurantName))
    }

    const handleClick = (name, imageSrc, mapLink) => {
        setModalName(name);
        setModalImgSrc(imageSrc);
        setModalMapLink(mapLink);
        setShowModal(true);

    }

    useEffect(() => {
        setFavourites(getLikedReactions())
    }, [])

    const activeCategories = useMemo(() => {
        const active = []
        if (toggleHusman) {
            active.push('Husman')
        }
        if (togglePizza) {
            active.push('Pizza')
        }
        if (toggleHamburger) {
            active.push('Hamburger')
        }
        if (toggleAsian) {
            active.push('Asian')
        }
        if (togglePubs) {
            active.push('Pubs')
        }
        if (toggleSpanish) {
            active.push('Spanish')
        }
        return active
    }, [toggleHusman, togglePizza, toggleHamburger, toggleAsian, togglePubs, toggleSpanish])

    const filteredFavourites = useMemo(() => {
        if (activeCategories.length === 0) {
            return favourites
        }

        return favourites.filter((item) =>
            item?.category && activeCategories.includes(item.category)
        )
    }, [activeCategories, favourites])

    //On load, populate the ul with FavouriteItem-components from localStorage

    return (
        <>
            <div className="category-grid">
                <Category name="Husman" toggled={toggleHusman} toggler={setToggleHusman} />
                <Category name="Pizza" toggled={togglePizza} toggler={setTogglePizza} />
                <Category name="Hamburger" toggled={toggleHamburger} toggler={setToggleHamburger} />
                <Category name="Asian" toggled={toggleAsian} toggler={setToggleAsian} />
                <Category name="Pubs" toggled={togglePubs} toggler={setTogglePubs} />
                <Category name="Spanish" toggled={toggleSpanish} toggler={setToggleSpanish} />
            </div>
            <div className="restuarant-card">
                <ul className="favourites-list">
                    {filteredFavourites.map((item) => (
                        <FavouriteItem
                            key={item.name}
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