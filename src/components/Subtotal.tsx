import { useStateValue } from '../StateProvider'
import '../styles/Subtotal.css'
import CurrencyFormat from 'react-currency-format'

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue()

  const calculateSubtotal = (basket: []) => {
    return basket.reduce((total: number, item: any) => total + item.price, 0)
  }

  const subTotal = calculateSubtotal(basket)

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value: number) => (
          <>
            <p>
              Subtotal ({basket?.length} items) : <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={subTotal}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <button>Proceed To Checkout</button>
    </div>
  )
}

export default Subtotal
