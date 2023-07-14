import React,{ useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import  Payment  from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';



const promise = loadStripe(
  "pk_test_51NQtPASCXwIFfPpIVIh4NBhlTI7FTa4aXVVCaglk1ygiJpG1pG148eQJ3V0AdJpkSf3fbQ1lGaJrkZFnqTLirlyJ00frk2mnS5"
);


function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged( authUser =>{
      console.log('THE USER IS >> ', authUser);

      if(authUser){
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
        
      }
    })

  }, []);

  return (
    
    <Router>
      
    
    <div className="app">
      <Routes>
            
            <Route path="/orders" element={[ <Header />,<Orders />]}/>
            <Route path="/login" element={[ <Login />]}/>

            <Route path="/checkout" element={[ <Header />,<Checkout />]}/>
            <Route path="/payment" element={[ <Header />,
            <Elements stripe={promise}>
              <Payment />
              </Elements>]}/>
                
            <Route path='/' element={[<Header />,<Home />]}/>
          
       </Routes>
    </div>
    </Router>
  );
}

export default App;
