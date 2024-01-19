import { useRecoilValue } from 'recoil'
import '../styles/Payment.css'
import { userEmail } from '../store/selectors/user'
import { basketDetails } from '../store/selectors/basket'
import CheckoutProduct from './CheckoutProduct'
import { BasketItem } from '../utils/types'
import FlipMove from 'react-flip-move'
import { Link } from 'react-router-dom'

function Payment() {
  const email = useRecoilValue(userEmail)
  const basket = useRecoilValue(basketDetails)
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout"> {basket.length} items) </Link>
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{email}</p>
            <p>123 New road</p>
            <p>Mumbai,Maharashtra</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            <FlipMove>
              {basket.map((item: BasketItem, index: number) => (
                <CheckoutProduct
                  key={parseInt(item.id) - index}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </FlipMove>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__details"></div>
        </div>
      </div>
    </div>
  )
}

export default Payment
