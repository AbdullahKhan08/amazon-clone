// import { useStateValue } from '../StateProvider'
import '../styles/Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { basketDetails } from '../store/selectors/basket'
import { useRecoilValue } from 'recoil'
import { BasketItem } from '../store/atoms/basket'

function Subtotal() {
  //   const [{ basket }] = useStateValue() -> context provider

  const basket = useRecoilValue(basketDetails)

  console.log(basket)

  const calculateSubtotal = (basket: BasketItem[]) => {
    return basket?.reduce(
      (total: number, item: BasketItem) => total + item.price,
      0
    )
  }

  const subTotal = calculateSubtotal(basket)

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
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
