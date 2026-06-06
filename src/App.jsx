import { useState } from 'react'
import TabSearch from './components/TabSearch/TabSearch'
import TabFavourites from './components/TabFavourites/TabFavourites'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import './App.css'

function App() {
    const [searchTab, setSearchTab] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const searchVariant = searchTab ? 'info' : 'outline-info'
    const favouritesVariant = searchTab ? 'outline-info' : 'info'
    //Mellanhand för att stänga meny och samtidigt sätta om det är favourites eller sök. 
    const handleSelect = (nextTab) => {
        setSearchTab(nextTab === 'search') //True om search false om favoriter. 
        setMenuOpen(false) //Stäng
    }
    return (
        <div className="app-shell">
            <Navbar
                expand="sm"
                className="app-nav"
                expanded={menuOpen}
                onToggle={setMenuOpen}
            >
                <Container fluid className="app-nav-container">
                    <Navbar.Toggle />
                    <Navbar.Collapse id="app-nav">
                        <Nav className="app-nav-buttons">
                            <Button variant={searchVariant} onClick={() => handleSelect('search')}>
                                Sök
                            </Button>
                            <Button variant={favouritesVariant} onClick={() => handleSelect('favourites')}>
                                Favoriter
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {searchTab ? <TabSearch /> : <TabFavourites />}
        </div>
    )
}

export default App
