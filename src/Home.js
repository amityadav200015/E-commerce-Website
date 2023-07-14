import React from 'react'
import "./Home.css"
import Product from './Product';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
        <img className='home__image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'  alt='banner'/>
        <div className='home__row'>
            <Product
            id="16319246189264912846"
            title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
            price={29.99}
            image="lean.jpg"
            rating={3}
            />
            <Product 
            id="48712875418275418725"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcol Fabric"
            price={10}
            image="alexa.jpg"
            rating={4}
            />
            {/*Product*/}
            
        </div>
        <div className='home__row'>
            <Product 
            id="986421164718716481648"
            title="Amazon Essentials Women's Slim-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2"
            price={10}
            image="shirts.jpg"
            rating={5}/>
           <Product 
            id="236582768576287658723"
            title="New Samsung S23 Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={100}
            image="phone.jpg"
            rating={5}/>
            <Product 
            id="983749398652365823856"
            title="Nike Men's Low-Top Sneakers Basketball Shoe, White Black Dark, 10"
            price={40}
            image="shoes.jpg"
            rating={3}/>
        </div>
        <div className='home__row'>
        <Product
            id="8716487164817648174871"
            title="SAMSUNG 34-Inch Odyssey G5 Ultra-Wide Gaming Monitor with 1000R Curved Screen, 165Hz, 1ms, FreeSync Premium, WQHD (LC34G55TWWNXZA, 2020 Model), Black"
            price={1999.99}
            image="samsung.jpg"
            rating={5}/>
            </div>
        </div>
      
    </div>
  );
}

export default Home
