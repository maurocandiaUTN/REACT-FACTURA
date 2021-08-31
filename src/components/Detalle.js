import React from 'react';
import Navigation from './Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Fragment } from 'react';



const Detalle = () => {

    let { detalleVar } = useParams();

    const [factura, setFactura] = useState({});

    useEffect(() => {
        getFactura();

    }, []);

    const getFactura = async () => {
        await fetch(`http:/filesjson/listado_facturas.json`)
            .then(res => res.json())
            .then(data => {

                data.map(factura => {
                    if(factura.nroCmp == detalleVar){
                        setFactura(factura);
                    }
                });

            })
    }



    

    return (
        <React.Fragment>
            <Navigation></Navigation>
            <Container>

                <Row>
                    <h1 style={{color:'green',marginTop: '40px'}}>CUIT EMPRESA: {factura.cuit}</h1>
                </Row>
                <Row style={{ marginTop: '50px' }}>
                    
                    <Col>
                        <p><b>Fecha:  {factura.fecha}</b></p>
                        <p><b>N° Comprobante:  {factura.ptoVta} - {factura.nroCmp}</b></p>
                        <p><b>Importe:  {factura.importe}</b></p>
                        <p><b>Moneda:  {factura.moneda}</b></p>
                        <p><b>Cliente Documento:  {factura.tipoDocRec} : {factura.nroDocRec}</b></p>
                        

                    </Col>
                    <Col >
                        <p><b>Cod. Autorizacion:  {factura.codAut}</b></p>
                        
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <hr></hr>
                        <Button variant="info" href="/home" style={{ height: '50px', width: '150px', fontSize: 19 }}>Volver</Button>
                    </Col>

                </Row>

            </Container>
        </React.Fragment>

    );


}

export default Detalle;