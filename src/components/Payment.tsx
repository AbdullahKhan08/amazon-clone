import '../styles/Payment.css'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userEmail } from '../store/selectors/user'
import CheckoutProduct from './CheckoutProduct'
import { BasketItem } from '../utils/types'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { DisplayFormat } from './Subtotal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config'
import { StripeCardElement } from '@stripe/stripe-js'
import { basketState } from '../store/atoms/basket'

function Payment() {
  const email = useRecoilValue(userEmail)
  const [basket, setBasket] = useRecoilState(basketState)

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')

  const navigate = useNavigate()

  const calculateSubtotal = (basket: BasketItem[]) => {
    return basket?.reduce(
      (total: number, item: BasketItem) => total + item.price,
      0
    )
  }

  const addOrders = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/orders/create`,
        {
          basket: basket.basket,
          totalAmount: calculateSubtotal(basket.basket),
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )

      if (response.status === 201) {
        console.log('Orders added successfully to databse')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post(
        `${BASE_URL}/payments/create?total=${
          calculateSubtotal(basket.basket) * 100
        }`
      )

      setClientSecret(response.data.clientSecret)
      console.log('stripe', stripe)
    }

    getClientSecret()
  }, [basket])

  console.log('secret is,', clientSecret)

  console.log('Elements:', elements)

  const subTotal = calculateSubtotal(basket.basket)

  const handleSubmit = async (e: any) => {
    // some stripe stuff....

    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    const { paymentIntent, error } = await stripe?.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements?.getElement(CardElement) as StripeCardElement,
        },
      }
    )

    if (paymentIntent?.status === 'succeeded') {
      addOrders()
      setSucceeded(true)
      setError(null)
      setProcessing(false)
      setTimeout(() => {
        navigate('/orders')
        setBasket({ isLoading: false, basket: [] })
      }, 1500)
    }

    console.log(paymentIntent)
    console.log(error)
  }

  const handleChange = (event: any) => {
    // some stripe stuff ...

    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout"> {basket.basket.length} items) </Link>
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
            <AnimatePresence>
              <motion.div
                className="payment__items"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.5 }}
              >
                {basket.basket?.map((item: BasketItem, index: number) => (
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
                      showButton={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <DisplayFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={subTotal}
                  displayType={'text'}
                  thousandSeparator={true}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy now'}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
