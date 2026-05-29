import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import MapModal from '../MapModal/MapModal'
import './RestaurantCard.css'

export default function RestaurantCard({
    name,
    imageSrc,
    mapLink,
    onReaction,
    closeable = false,
}) {
    const [showMap, setShowMap] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) {
        return null
    }

    const handleReaction = (reaction) => {
        if (typeof onReaction === 'function') {
            onReaction(reaction)
        }
    }

    return (
        <div className="restaurant-card">
            {closeable && (
                <button
                    type="button"
                    className="restaurant-card-close"
                    aria-label="Close restaurant card"
                    onClick={() => setIsVisible(false)}
                >
                    ✖️
                </button>
            )}
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