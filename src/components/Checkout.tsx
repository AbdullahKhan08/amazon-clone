import { useRecoilValue } from 'recoil'
// import { useStateValue } from '../StateProvider'
import '../styles/Checkout.css'
import { BasketItem } from '../utils/types'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import { basketDetails } from '../store/selectors/basket'
import { motion, AnimatePresence } from 'framer-motion'

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
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.5 }}
            >
              {basket?.map((item: BasketItem, index: number) => (
                <motion.div
                  key={parseInt(item.id) - index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckoutProduct
                    key={parseInt(item.id) - index}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
