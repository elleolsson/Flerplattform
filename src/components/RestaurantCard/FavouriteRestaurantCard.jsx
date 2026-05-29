import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import MapModal from '../MapModal/MapModal'
import './RestaurantCard.css'

export default function FavouriteRestaurantCard({ show, onHide, name, imageSrc, mapLink }) {
    const [showMap, setShowMap] = useState(false)

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="restaurant-card">
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
                </div>
                <MapModal
                    show={showMap}
                    onHide={() => setShowMap(false)}
                    mapLink={mapLink}
                    name={name}
                />
            </Modal.Body>
        </Modal>
    )
}