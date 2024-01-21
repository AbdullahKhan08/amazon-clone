import { useRecoilState } from 'recoil'
// import { useStateValue } from '../StateProvider'
import '../styles/CheckoutProduct.css'
import { productProps } from '../utils/types'
import { basketState } from '../store/atoms/basket'

const CheckoutProduct: React.FC<productProps> = ({
  id,
  title,
  image,
  price,
  rating,
  showButton,
}) => {
  const [basketDetails, setBasketDetails] = useRecoilState(basketState)
  //   const [{ basket }, dispatch] = useStateValue()

  //   const removeFromBasket = () => {
  //     dispatch({
  //       type: 'REMOVE_FROM_BASKET',
  //       id: id,
  //     })
  //   }
  const removeFromBasketRecoil = (idToRemove: string) => {
    // Find the index of the item to remove
    const index = basketDetails.basket.findIndex(
      (item) => item.id === idToRemove
    )

    let newBasket = [...basketDetails.basket]

    if (index >= 0) {
      newBasket.splice(index, 1)
    } else {
      console.warn(
        `Cant remove product (id: ${idToRemove}) as it is not in the basket`
      )
    }

    // Update the Recoil state with the new array
    setBasketDetails({
      isLoading: basketDetails.isLoading,
      basket: newBasket,
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
        {showButton && (
          <button onClick={() => removeFromBasketRecoil(id)}>
            Remove from Basket
          </button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
