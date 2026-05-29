import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function MapModal({ show, onHide, mapLink, name }) {
    const title = name ? `${name} map` : 'Map'

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {mapLink ? (
                    <iframe
                        className="map-iframe"
                        title={title}
                        src={mapLink}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                ) : (
                    <p>No map link available.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                {mapLink && (
                    <Button as="a" href={mapLink} target="_blank" rel="noreferrer">
                        Open in maps
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}