import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import './NavbarComponent.css';
import { FiUser } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { LuUserCircle } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuBike } from "react-icons/lu";

function NavbarComponent({ activeTab, setActiveTab }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const isLoggedIn = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setShowDropdown(false)
        setActiveTab('Login');
    };

    return (
        <Navbar bg="light" variant="light" expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand onClick={() => setActiveTab('FoodSearch')} className="healthtrack-brand">
                    HealthTrack
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setActiveTab('FoodSearch')} className={activeTab === 'FoodSearch' ? 'active' : ''}>
                            Food Search
                        </Nav.Link>
                        <Nav.Link onClick={() => setActiveTab('NutriTrack')} className={activeTab === 'NutriTrack' ? 'active' : ''}>
                            Nutrient Track
                        </Nav.Link>
                        <Nav.Link onClick={() => setActiveTab('SportSearch')} className={activeTab === 'SportSearch' ? 'active' : ''}>
                            Sport Search
                        </Nav.Link>
                        <Nav.Link onClick={() => setActiveTab('SportTrack')} className={activeTab === 'SportTrack' ? 'active' : ''}>
                            Calories Track
                        </Nav.Link>

                    </Nav>
                    {isLoggedIn ? (
                        <Nav className="user-dropdown">
                        <NavDropdown
                            align="start"
                            title={<span><FiUser className="user-icon"/>{userName}</span>}
                            id="nav-dropdown"
                            show={showDropdown}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <NavDropdown.Item  onClick={() => setActiveTab('UserNutriTrack')}>
                                <LuUserCircle style={{marginRight: '3px', verticalAlign: 'middle'}}/>Intake History
                            </NavDropdown.Item>
                            <NavDropdown.Item  onClick={() => setActiveTab('FoodCart')}>
                                <IoFastFoodOutline style={{marginRight: '3px', verticalAlign: 'middle'}}/>Food Cart
                            </NavDropdown.Item>
                            <NavDropdown.Item  onClick={() => setActiveTab('SportCart')}>
                                <LuBike style={{marginRight: '3px', verticalAlign: 'middle'}}/>Sport Cart
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>
                                <TbLogout2 style={{ marginRight: '3px', verticalAlign: 'middle' }} />Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                        </Nav>
                    ) : (
                        <button className="login-button" onClick={() => setActiveTab('Login')}>Log in/Sign up</button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;


