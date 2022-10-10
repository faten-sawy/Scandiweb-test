import React, { PureComponent } from "react";
import ProductListing from "./Pages/Product-Listing/ProductListing";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import NavBar from "./Components/NavBar/Nav";
import PageNotFound from "./PageNotFound";

import { Route, Switch } from "react-router-dom";

export class App extends PureComponent {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ProductListing} />
          <Route path="/details/:id" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

export default App;
