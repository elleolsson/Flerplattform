import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import MapModal from '../MapModal/MapModal'
import './RestaurantCard.css'

const STORAGE_KEY = 'restaurantReactions'

const saveReaction = (name, reaction) => {
    if (!name || !reaction) {
        return
    }

    const stored = localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    const next = Array.isArray(parsed) ? parsed : []
    const existingIndex = next.findIndex((item) => item?.name === name)

    if (existingIndex >= 0) {
        next[existingIndex] = { name, reaction }
    } else {
        next.push({ name, reaction })
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export default function RestaurantCard({ name, imageSrc, mapLink }) {
    const [showMap, setShowMap] = useState(false)

    const handleReaction = (reaction) => {
        saveReaction(name, reaction)
    }

    return (
        <div className="restaurant-card">

            <h3 className="restaurant-card-name">{name}</h3>
            <div className="restaurant-card-media">
                <div className="restaurant-card-image">
                    {imageSrc ? (
                        <img src={imageSrc} alt={name} />
                    ) : (
                        <div className="restaurant-card-placeholder">No image</div>
                    )}
                </div>
                <Button
                    className="restaurant-card-map"
                    variant="secondary"
                    onClick={() => setShowMap(true)}
                    disabled={!mapLink} //Om ingen map-lank skickades bland params
                >
                    Open map
                </Button>
            </div>
            <ButtonGroup className="restaurant-card-reactions">
                <Button variant="outline-success" onClick={() => handleReaction('like')}>
                    Like
                </Button>
                <Button variant="outline-danger" onClick={() => handleReaction('dislike')}>
                    Dislike
                </Button>
            </ButtonGroup>
            <MapModal
                show={showMap}
                onHide={() => setShowMap(false)}
                mapLink={mapLink}
                name={name}
            />
        </div>
    )
}