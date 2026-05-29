import { useState } from 'react'
import TabSearch from './components/TabSearch/TabSearch'
import TabFavourites from './components/TabFavourites/TabFavourites'
import SearchRadius from './components/SearchRadius/SearchRadius'
import SearchLocation from './components/SearchLocation/SearchLocation'
import { Button } from 'react-bootstrap'
import './App.css'

function App() {
    const [searchTab, setSearchTab] = useState(true)
    const searchVariant = searchTab ? 'info' : 'outline-info'
    const favouritesVariant = searchTab ? 'outline-info' : 'info'
    return (
        <div className="app-shell">
            <div className="container">
                <div className="tabs">
                    <Button variant={searchVariant} onClick={() => setSearchTab(true)}>Sök</Button>
                    <Button variant={favouritesVariant} onClick={() => setSearchTab(false)}>Favoriter</Button>
                </div>
            </div>
            {searchTab ? <TabSearch /> : <TabFavourites />}
        </div>
    )
}

export default App
