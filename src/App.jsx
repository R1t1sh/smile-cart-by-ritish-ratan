// import "./App.css";
// import Product from "./components/Product";

// import { Link } from "react-router-dom";

// const App = () => (
//   <div className="flex space-x-2">
//     <Link to="/">Home</Link>
//     <Link to="/product">Product</Link>
//   </div>
// );

// export default App;
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
// import Home from "./components/Home";
import PageNotFound from "./components/common/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";

const App = () => (
  // <Switch>
  //   <Route exact component={ProductList} path="/products" />
  //   <Route exact component={Product} path="/products/:slug" />
  //   <Route exact component={Product} path="/product" />
  //   <Redirect exact from="/" to="/products" />
  //   <Route component={PageNotFound} path="*" />
  // </Switch>

  <Switch>
    <Route exact component={Product} path={routes.products.show} />
    <Route exact component={ProductList} path={routes.products.index} />
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);
export default App;
