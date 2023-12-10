import { useEffect} from 'react'
import './App.css'
import Header from "./component/layout/Header/Header.jsx"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './component/Home/Home.jsx';
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer.jsx';
import { ToastContainer } from "react-toastify";
import ProductDetails from './component/Product/ProductDetails.jsx';
import LoginSignUp from './component/User/LoginSignUp.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAsync } from './features/auth/authSlice.js';
import UserOptions from './component/layout/Header/UserOptions.jsx';
import Profile from './component/User/Profile.jsx';
import UpdateProfile from './component/User/UpdateProfile.jsx';


function App() {
  const dispatch =useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  console.log("------user",user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    // if(isAuthenticated){
      dispatch(loadUserAsync())

    // }
    

  }, [dispatch]);
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}
      <ToastContainer position="top-right" autoClose={500} />
      <Routes>
      <Route  path="/" element = {<Home/>}/>
      <Route  path="/product/:id" element = {<ProductDetails/>}/>
      <Route  path="/login" element = {<LoginSignUp/>}/>
      <Route  path="/account" element = {<Profile/>}/>
      <Route  path="/me/update" element = {<UpdateProfile/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
