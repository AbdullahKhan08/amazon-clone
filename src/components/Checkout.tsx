import { useRecoilValue } from 'recoil'
// import { useStateValue } from '../StateProvider'
import '../styles/Checkout.css'
import { BasketItem } from '../utils/types'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import { basketDetails } from '../store/selectors/basket'

function Checkout() {
  //   const [{ basket }] = useStateValue()

  const basket = useRecoilValue(basketDetails)
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          className="checkout__ad"
        ></img>

        <div className="checkout__title">
          <h2>Your Shopping Basket</h2>
          {basket?.map((item: BasketItem, index: number) => {
            return (
              <CheckoutProduct
                key={parseInt(item.id) - index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            )
          })}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
