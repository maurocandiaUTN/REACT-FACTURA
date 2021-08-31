import { useState, useEffect } from 'react';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Dropdown, Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


const Navigation = () => {

  //variable router(manager de rutas para hacer push)
  let history = useHistory();

  const [buscador1, setBuscador1] = useState("");

  
  const buscador = async (valorInput) => {

    history.push(`/home/buscador/${valorInput}`);
    window.location.reload();
  }

  //setea de forma reactiva las variables buscador 1 (input)
  const haddler1 = (event) => {
    event.preventDefault()
    setBuscador1(event.target.value);

  }

  //evento de los botones
  const activarBoton1 = () => {
    buscador(buscador1);
    
  }

  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark" style={{ height: '130px', fontSize: 20 }}>
        <Navbar.Brand href="/home">HOME</Navbar.Brand>
        <Nav className="mr-auto">


          <Form className="d-flex" style={{ marginLeft: '50px', width: '370px' }}>
            <label style={{ width: '350px', color: 'white' }}>Doc. Cliente:</label>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              onChange={(e) => haddler1(e)}
              name="denominacion"
            />

            <Button variant="secondary" onClick={activarBoton1} >Buscar</Button>
          </Form>

          
        </Nav>
      </Navbar>
    </React.Fragment>

  );


}

export default Navigation;