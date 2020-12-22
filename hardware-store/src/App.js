import React from 'react';
import './App.css';
import Products from './components/Products/Products';
import Navigation from './components/Navigation';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import References from './components/ReferencesSystem/References';
import Home from './components/Home';
import Brands from './components/Brands/Brands';
import Types from './components/Types/Types';
import Cart from './components/Cart/Cart';
import LoginForm from './components/LoginRegisterForms/LoginForm';
import RegistrationForm from './components/LoginRegisterForms/RegistrationForm';
import Product from './components/Products/Product';

function App() {

  return (
    <BrowserRouter>
        <div className='container'>
          <Switch>
            <Route path='/' component={LoginForm} exact/>
            <Route path='/registration' component={RegistrationForm}/>
            <Route path='/admin'>
              <h1 className='m-3 d-flex justify-content-center'>i-Bozh</h1>

              <Navigation role='admin'/>

              <Switch>
                <Route path='/admin/home' component={Home}/>
                <Route path='/admin/products'><Products role='admin'/></Route>
                <Route path='/admin/brands' component={Brands}/>
                <Route path='/admin/types' component={Types}/>
                <Route path='/admin/supplies' component={Products}/>{/*Поставки */}
                <Route path='/admin/suppliers' component={Products}/>{/*Поставщики */}
                <Route path='/admin/help' component={References}/>
              </Switch>
            </Route>

            <Route path='/client'>
              <h1 className='m-3 d-flex justify-content-center'>i-Bozh</h1>

              <Navigation role='client'/>

              <Switch>
                <Route path='/client/home' component={Home}/>
                <Route path='/client/products'><Products role='client'/></Route>
                <Route path='/client/help' component={References}/>
              </Switch>
            </Route>

          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;