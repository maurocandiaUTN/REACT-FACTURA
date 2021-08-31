import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import Navigation from './Navigation';
import Table from 'react-bootstrap/Table';
const fetch = require('node-fetch');


const Home = () => {

  const [facturas, setFacturas] = useState([]);
  const [ordenar, setOrdenar] = useState(true);
  const [banderaOrdenar, setbanderaOrdenar] = useState("");

  //useParams es para obtener las variables de la url(params) con objeto literal
  let { code } = useParams();

  //al iniciar el componente trae todo
  useEffect(() => {

        filtrarFacturas();

  }, []);

  
  const filtrarFacturas = () => {
    //obtengo las variables de los params
    const paramCode = code;

    if(paramCode){

      fetch(`http:/filesjson/listado_facturas.json`)
      .then(res => res.json())
      .then(data => {

        //busco si existe facturas con nroDoc similares
        var arrBuscador = [];
        
        data.map(factura => {
          
          var idx = (factura.nroDocRec.toString()).indexOf(paramCode);
          
          if(idx != -1){
            arrBuscador.push(factura);
          }
        });
        
        setFacturas(arrBuscador);
      });


    }else{
      //trae odo
      fetch(`http:/filesjson/listado_facturas.json`)
      .then(res => res.json())
      .then(data => {

        setFacturas(data);
      });

    }
    
  }

  const ordenarFacturas = () => {
    
    if(ordenar == true){
      facturas.sort((a,b) => a.importe - b.importe);
      setbanderaOrdenar("ASC")
      setOrdenar(false);
    }

    if(ordenar == false){
      facturas.sort((a,b) => b.importe - a.importe);
      setbanderaOrdenar("DESC")
      setOrdenar(true);
    }
    
    
  }



  return (
    <React.Fragment>
      <Navigation></Navigation>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#<p></p><p></p></th>
            <th>Fecha<p></p><p></p></th>
            <th>Nº Comprobante<p></p><p></p></th>
            <th>Importe<br></br><a onClick={ordenarFacturas} href={"#"}> Ordenar </a> <a>{banderaOrdenar}</a></th>
            <th>Documento Cliente<p></p><p></p></th>
            <th>Tipo Cod Aut<p></p><p></p></th>
            <th>Detalle<p></p><p></p></th>
          </tr>
        </thead>
        <tbody>

          {facturas.map((factura, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td >{factura.fecha}</td>
              <td >{factura.ptoVta} - {factura.nroCmp}</td>
              <td >{factura.importe}</td>
              <td >{factura.nroDocRec}</td>
              <td >{factura.tipoCodAut}</td>
              
              <td>
                <a href={`/detalle/${factura.nroCmp}`}>
                  Ver Detalle
                </a>
              </td>
            </tr>
          ))}


        </tbody>
      </Table>
    </React.Fragment>
  );


}

export default Home;