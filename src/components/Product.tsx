import '../styles/Product.css'
import { productProps } from '../utils/types'
import { useStateValue } from '../StateProvider'

const Product: React.FC<productProps> = ({
  id,
  title,
  image,
  price,
  rating,
}) => {
  const [{ basket }, dispatch] = useStateValue()

  console.log(basket)

  const addToBasket = () => {
    // dispatch the item into the data layer

    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    })
  }
  return (
    <div id={id} className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>
      <img src={image}></img>
      <button onClick={addToBasket}>Add To Cart</button>
    </div>
  )
}

export default Product
