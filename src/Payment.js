import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Card } from '@mui/material';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import {db} from './firebase'


function Payment() {
    const [{basket, user},dispatch] = useStateValue();
    console.log("your uid is",user.uid)
    
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisable] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate the special atripe which allowa us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('the secrest is>>', clientSecret)

    const handleSubmit = async (event) => {
        // do all the fancy strpe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            
           
           db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent?.id)
            .set({
                basket: basket,
                
                amount: paymentIntent?.amount,
                created: paymentIntent?.created
            })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders')
        })
    }

    const handleChange = event => {
        // listen for changes in the cardelements
        // and display ant errors as the customer types their card details
        setDisable(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className='payment'>
        <div className='payment__container'>

            <h1>
                Checkout (<Link to="/checkout">{basket?.length} items
                </Link>)
            </h1>
            {/*Payemrt section address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>112 Suncity Part 1 </p>
                    <p>Dewas MP 455001</p>
                </div>

            </div>
            {/*Payemrt section Review items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />

                    ))}
                </div>
                
            </div>

            {/*Payemrt section payment method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/*stripe magic */}

                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className='payment__priceContainer'>
                            <CurrencyFormat 
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}

                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>

                                </button>

                        </div>
                    </form>
                </div>
                
            </div>
        </div>
      
    </div>
  )
}

export default Payment
