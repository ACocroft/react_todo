import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

export default function Navigation() {
  const { currentUser } = useAuth()  
  return (
    <Navbar expand='md' bg='dark' variant='dark' sticky='top' className='p-3'>
        <Navbar.Brand href='/'>ToDo Webpage</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Nav>
                {!currentUser &&
                 <Link to='/login' className='nav-link'>Login</Link>
                }
                <Link to='/todos' className='nav-link'>Todos</Link>
                <Link to='/categories' className='nav-link'>Categories</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
