import React from 'react';
import './App.css';
import Products from './components/Products/Products';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { References, Home, Brands, Types, Cart, LoginForm, RegistrationForm, Supplies, Suppliers, Order } from './components';

function App() {

  return (
    <BrowserRouter>
      <div className='container'>
        <Switch>
          <Route path='/' component={LoginForm} exact />

          <Route path='/registration' component={RegistrationForm} />
          <Route path='/admin'>
            <p className='d-flex justify-content-center'><img src='/My logo/logo_transparent.png' width='20%' height='130px' /></p>

            <Navigation />

            <Switch>
              <Route path='/admin/home'><Home /></Route>
              <Route path='/admin/products'><Products role='admin' /></Route>
              <Route path='/admin/brands' component={Brands} />
              <Route path='/admin/types' component={Types} />
              <Route path='/admin/supplies' component={Supplies} />
              <Route path='/admin/suppliers' component={Suppliers} />
              <Route path='/admin/orders' component={Order} />
              <Route path='/admin/help'><References role='admin' /></Route>
            </Switch>
          </Route>

          <Route path='/client/:login' component={Navigation}>

            <p className='d-flex justify-content-center'><img src='/My logo/logo_transparent.png' width='20%' height='130px' /></p>
            <Navigation />

            <Switch>
              <Route path='/client/:login/home'><Home /></Route>
              <Route path='/client/:login/products'><Products role='client' /></Route>
              <Route path='/client/:login/shoppingCart' component={Cart}></Route>
              <Route path='/client/:login/help'><References role='client' /></Route>
            </Switch>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;