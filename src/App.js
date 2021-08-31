import React, {Component} from 'react';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import Detalle from './components/Detalle';

class App extends Component{
    
  
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Home} ></Route>
        <Route exact path="/home" component={Home} ></Route>
        <Route exact path="/home/buscador/:code" component={Home} ></Route>
        <Route path="/detalle/:detalleVar" component={Detalle} ></Route>
      </Switch>
    ) 
  }
}

export default App;