import '../styles/Home.css'
import Product from './Product'
function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        />

        <div className="home__row">
          <Product
            id="1122789"
            title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
            image="https://m.media-amazon.com/images/I/81vvgZqCskL._SY522_.jpg"
            price={16.66}
            rating={4}
          />
          <Product
            id="3344678"
            title="KitchenAid Artisan Series 5 Quart Tilt Head Stand Mixer with Pouring Shield KSM150PS"
            image="https://m.media-amazon.com/images/I/71KiX7LRTML._AC_SX679_.jpg"
            price={449.95}
            rating={5}
          />
        </div>
        <div className="home__row">
          <Product
            id="2568990"
            title="Bluetooth Speaker with HD Sound, Portable Wireless, IPX5 Waterproof"
            image="https://m.media-amazon.com/images/I/81djh1gfUwL._AC_SY879_.jpg"
            price={19.99}
            rating={4}
          />
          <Product
            id="5678865"
            title="Galaxy Tab S6 Lite 10.4 64GB Android Tablet"
            image="https://m.media-amazon.com/images/I/51m6nUlDXoL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
            price={199.99}
            rating={3}
          />

          <Product
            id="4567389"
            title="SAMSUNG FT45 Series 24-Inch FHD 1080p Computer Monitor"
            image="https://m.media-amazon.com/images/I/81878kql+gL._AC_SX679_.jpg"
            price={119.99}
            rating={4}
          />
        </div>
        <div className="home__row">
          <Product
            id="8976543"
            title="Apple iPad Pro 12.9-inch (6th Generation): with M2 chip, Liquid Retina XDR Display, 256GB"
            image="https://m.media-amazon.com/images/I/81c+9BOQNWL._AC_SX679_.jpg"
            price={1189.99}
            rating={5}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
