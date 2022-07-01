import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route Route exact path="/" component={ Home } />
        <Route Route exact path="/cart" component={ Cart } />
        <Route path="/productdetails/:id" component={ ProductDetails } />
        <Route path="/checkout-products" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
