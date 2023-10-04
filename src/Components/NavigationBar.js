import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

function NavigationBar() {
    return (
        <div>
            <Navbar>
                <NavbarBrand href="/">Todo List</NavbarBrand>
                <Nav className="me-auto">
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/task">Todo List</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contact">Contact</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/logout">Logout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavigationBar;