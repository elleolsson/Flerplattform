import './FavouriteItem.css'

export default function FavouriteItem({ name, onDelete, handleClick }) {
    return (
        <li className="favourite-item" onClick={handleClick}>
            <p className="favourite-item-name">{name}</p>
            <button
                type="button"
                className="favourite-item-delete"
                onClick={(event) => {
                    event.stopPropagation()
                    onDelete?.()
                }}
            >
                ❌
            </button>
        </li>
    )
}