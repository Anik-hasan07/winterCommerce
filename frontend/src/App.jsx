import { useEffect, useState } from 'react'
import './App.css'
import Header from "./component/layout/Header/Header.jsx"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './component/Home/Home.jsx';
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer.jsx';
import { ToastContainer } from "react-toastify";
import ProductDetails from './component/Product/ProductDetails.jsx';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

  }, []);
  return (
    <Router>
      <Header/>
      <ToastContainer position="top-right" autoClose={500} />
      <Routes>
      <Route  path="/" element = {<Home/>}/>
      <Route  path="/product/:id" element = {<ProductDetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
