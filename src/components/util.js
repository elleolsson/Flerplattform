export const STORAGE_KEYS = {
    reactions: 'restaurantReactions',
    searchRadius: 'searchRadius',
}

const readJson = (key, fallback) => {
    const stored = localStorage.getItem(key)

    if (!stored) {
        return fallback
    }

    try {
        return JSON.parse(stored)
    } catch {
        return fallback
    }
}

const writeJson = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

//I hela kilometer
export const getSearchRadius = (defaultValue = 5) => {
    const savedValue = localStorage.getItem(STORAGE_KEYS.searchRadius)
    const parsedValue = Number(savedValue)

    return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : defaultValue
}

export const setSearchRadius = (value) => {
    localStorage.setItem(STORAGE_KEYS.searchRadius, String(value))
}

export const saveReaction = ({ name, reaction, imageSrc, mapLink, category }) => {
    if (!name || !reaction) {
        return
    }

    const parsed = readJson(STORAGE_KEYS.reactions, [])
    const next = Array.isArray(parsed) ? parsed : []
    const existingIndex = next.findIndex((item) => item?.name === name)
    const payload =
        reaction === 'like'
            ? { name, reaction, imageSrc, mapLink, category }
            : { name, reaction }

    if (existingIndex >= 0) {
        next[existingIndex] = payload
    } else {
        next.push(payload)
    }

    writeJson(STORAGE_KEYS.reactions, next)
}

export const removeReaction = (name) => {
    const parsed = readJson(STORAGE_KEYS.reactions, [])
    const next = Array.isArray(parsed)
        ? parsed.filter((item) => item?.name !== name)
        : []

    writeJson(STORAGE_KEYS.reactions, next)
    return next
}

export const getLikedReactions = () => {
    const parsed = readJson(STORAGE_KEYS.reactions, [])

    return Array.isArray(parsed)
        ? parsed.filter((item) => item?.reaction === 'like')
        : []
}
