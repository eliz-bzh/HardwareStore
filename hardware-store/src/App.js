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
import Supplies from './components/Supplies/Supplies';
import Suppliers from './components/Suppliers/Suppliers';

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
                <Route path='/admin/home'><Home/></Route>
                <Route path='/admin/products'><Products role='admin'/></Route>
                <Route path='/admin/brands' component={Brands}/>
                <Route path='/admin/types' component={Types}/>
                <Route path='/admin/supplies' component={Supplies}/>
                <Route path='/admin/suppliers' component={Suppliers}/>
                <Route path='/admin/help'><References role='admin'/></Route>
              </Switch>
            </Route>

            <Route path='/client/:login'>
              <h1 className='m-3 d-flex justify-content-center'>i-Bozh</h1>
              <Navigation role='client'/>

              <Switch>
                <Route path='/client/:login/home'><Home/></Route>
                <Route path='/client/:login/products'><Products role='client'/></Route>
                <Route path='/client/:login/shoppingCart' component={Cart}></Route>
                <Route path='/client/:login/help'><References role='client'/></Route>
              </Switch>
            </Route>

          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;