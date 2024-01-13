// import { useStateValue } from '../StateProvider'
import '../styles/Subtotal.css'
import { basketDetails } from '../store/selectors/basket'
import { useRecoilValue } from 'recoil'
import { BasketItem } from '../store/atoms/basket'

function Subtotal() {
  //   const [{ basket }] = useStateValue() -> context provider

  const basket = useRecoilValue(basketDetails)

  const calculateSubtotal = (basket: BasketItem[]) => {
    return basket?.reduce(
      (total: number, item: BasketItem) => total + item.price,
      0
    )
  }

  const subTotal = calculateSubtotal(basket)

  return (
    <div className="subtotal">
      <DisplayFormat
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
      />

      <button>Proceed To Checkout</button>
    </div>
  )
}

interface CurrencyFormatProps {
  renderText: (value: string) => React.ReactNode
  decimalScale: number
  value: number
  displayType: 'text' | 'input'
  thousandSeparator: boolean
}

const DisplayFormat: React.FC<CurrencyFormatProps> = ({
  renderText,
  decimalScale,
  value,
  displayType,
  thousandSeparator,
}) => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalScale,
    maximumFractionDigits: decimalScale,
    useGrouping: thousandSeparator,
  }).format(value)
  return (
    <>
      {displayType === 'text' ? (
        renderText(formattedValue)
      ) : displayType === 'input' ? (
        <input type="text" value={formattedValue} readOnly />
      ) : null}
    </>
  )
}

export default Subtotal
