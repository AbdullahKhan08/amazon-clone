import '../styles/Product.css'
import { productProps } from '../utils/types'
// import { useStateValue } from '../StateProvider'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { basketState } from '../store/atoms/basket'
import { basketDetails } from '../store/selectors/basket'
import { userEmail } from '../store/selectors/user'
import { motion } from 'framer-motion'

const Product: React.FC<productProps> = ({
  id,
  title,
  image,
  price,
  rating,
}) => {
  const cardVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  }
  //   const [{ basket }, dispatch] = useStateValue()
  const email = useRecoilValue(userEmail)
  const setBasket = useSetRecoilState(basketState)
  const basket = useRecoilValue(basketDetails)

  console.log(basket)

  //   const addToRecoil = () => {
  //     setBasket({ isLoading: false, basket })
  //   }
  const addToRecoil = () => {
    if (!email) {
      alert('Please sign in before adding products to cart')
    } else {
      setBasket({
        isLoading: false,
        basket: [...basket, { id, title, image, price, rating }],
      })
    }
  }

  //   const addToBasket = () => {
  //     // dispatch the item into the data layer

  //     dispatch({
  //       type: 'ADD_TO_BASKET',
  //       item: {
  //         id,
  //         title,
  //         image,
  //         price,
  //         rating,
  //       },
  //     })
  //   }
  return (
    <motion.div
      id={id}
      variants={cardVariants}
      whileHover="hover"
      className="product card"
      //   style={{
      //     backgroundColor: '#fff',
      //     borderRadius: '8px',
      //     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      //     cursor: 'pointer',
      //     overflow: 'hidden',
      //     position: 'relative',
      //   }}
    >
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
      <button onClick={addToRecoil}>Add To Cart</button>
    </motion.div>
  )
}

export default Product
