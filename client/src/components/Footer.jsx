import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

function Footer() {
  return (
    <Navbar bg='light' variant='light' expand='sm'>
      <Container fluid>
        <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }}>
          <NavDropdown title='Team Members' id='footer-dropdown' drop='up'>
            <NavDropdown.Item href='/about#0'>Jarrett Zapata</NavDropdown.Item>
            <NavDropdown.Item href='/about#1'>Rohan Rawat</NavDropdown.Item>
            <NavDropdown.Item href='/about#2'>Anthony Borges</NavDropdown.Item>
            <NavDropdown.Item href='/about#3'>Tongda Yin</NavDropdown.Item>
            <NavDropdown.Item href='/about#4'>
              Gabriel Gonzalez
            </NavDropdown.Item>
            <NavDropdown.Item href='/about#5'>
              Abraham Laurente
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Footer
