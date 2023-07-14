import React, { useState } from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import Checkout from './Checkout';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from 'react-router-dom';
function Subtotal() {
  const navigate = useNavigate();
    const [{ basket }, dispatch] = useStateValue();



  return (
    <div className='subtotal'>
        <CurrencyFormat
        renderText={(value) =>(
            <>
            <p>
             Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
                <input type='checkbox' /> This order contains a gift
            </small>
                </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />

        <button onClick={e => navigate('/payment',{replace:true})}> Proceed to Checkout</button>
      
    </div>
  )
}

export default Subtotal
