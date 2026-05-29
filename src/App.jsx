import { useState } from 'react'
import TabSearch from './components/TabSearch/TabSearch'
import TabFavourites from './components/TabFavourites/TabFavourites'
import SearchRadius from './components/SearchRadius/SearchRadius'
import SearchLocation from './components/SearchLocation/SearchLocation'
import { Button } from 'react-bootstrap'
import './App.css'

function App() {
    return (
        <div className="app-shell">
            <div className="container">
                <div className="tabs">
                    <Button variant='info'>Sök</Button>
                    <Button variant='outline-info'>Favoriter</Button>
                </div>
            </div>
        </div>
    )
}

export default App
