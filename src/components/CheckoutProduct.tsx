import { useStateValue } from '../StateProvider'
import '../styles/CheckoutProduct.css'
import { productProps } from '../utils/types'

const CheckoutProduct: React.FC<productProps> = ({
  id,
  title,
  image,
  price,
  rating,
}) => {
  const [{ basket }, dispatch] = useStateValue()

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    })
  }
  return (
    <div key={id} className="checkoutProduct">
      <img className="checkoutProduct__image" src={image}></img>
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>Remove from Basket</button>
      </div>
    </div>
  )
}

export default CheckoutProduct
