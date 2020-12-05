import React from 'react';
import './App.css';
import Products from './components/Products/Products';
import Navigation from './components/Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import References from './components/ReferencesSystem/References';
import Home from './components/Home';
import Brands from './components/Brands/Brands';
import Types from './components/Types/Types';

function App() {

  return (
    <BrowserRouter>
      <div className='container'>

        <h1 className='m-3 d-flex justify-content-center'>i-Bozh</h1>

        <Navigation/>
        
        <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/products' component={Products}/>
          <Route path='/brands' component={Brands}/>
          <Route path='/types' component={Types}/>
          <Route path='/supplies' component={Products}/>
          <Route path='/suppliers' component={Products}/>
          <Route path='/help' component={References}/>
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
