import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home.js";
import About from "./page/About.js";
import Contact from "./page/Contact.js";
import Login from "./page/Login.js";
import NewProduct from "./page/NewProduct.js";
import SignUp from "./page/SignUp.js";
import Cart from "./page/Cart.js";
import { store } from "./redux/index.js";
import { Provider } from "react-redux";
import Products from "./components/Products.js";
import Product from "./page/Product.js";
import Confirmation from "./page/Confirmation.js";
import Cancel from "./page/Cancel.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="product/:filterby" element={<Product />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="newproduct" element={<NewProduct />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="cart" element={<Cart />} />
      <Route path="successful" element={<Confirmation />} />
      <Route path="cancel" element={<Cancel />} />
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

