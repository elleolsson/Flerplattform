import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import MapModal from '../MapModal/MapModal'
import { saveReaction } from '../util'
import './RestaurantCard.css'

export default function RestaurantCard({
    name,
    imageSrc,
    mapLink,
    distanceText,
    timeText,
}) {
    const [showMap, setShowMap] = useState(false)

    const handleReaction = (reaction) => {
        saveReaction({ name, reaction, imageSrc, mapLink })
    }

    return (
        <div className="restaurant-card">

            <div className="restaurant-card-header">
                <h3 className="restaurant-card-name">{name}</h3>
                {distanceText && (
                    <span className="restaurant-card-distance">{distanceText}</span>
                )}
            </div>
            <div className="restaurant-card-media">
                <div className="restaurant-card-image">
                    {imageSrc ? (
                        <img src={imageSrc} alt={name} />
                    ) : (
                        <div className="restaurant-card-placeholder">No image</div>
                    )}
                </div>
                <div className="restaurant-card-map-row">
                    <Button
                        className="restaurant-card-map"
                        variant="secondary"
                        onClick={() => setShowMap(true)}
                        disabled={!mapLink} //Om ingen map-lank skickades bland params
                    >
                        Open map
                    </Button>
                    {timeText && (
                        <span className="restaurant-card-time">{timeText}</span>
                    )}
                </div>
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