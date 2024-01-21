import '../styles/Order.css'
import moment from 'moment'
import CheckoutProduct from './CheckoutProduct'
import { DisplayFormat } from './Subtotal'

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      {console.log(order)}

      {console.log(order.totalAmount)}
      {console.log(typeof order.totalAmount)}
      {console.log(order.createdAt)}
      {console.log(typeof order.createdAt)}
      <p>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p className="order__id">
        <small>{order._id}</small>
      </p>
      {order.basket?.map((item: any, index: number) => (
        <CheckoutProduct
          key={parseInt(item._id) - index}
          id={item._id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          showButton={false}
        />
      ))}
      {console.log(order.totalAmount)}
      <DisplayFormat
        renderText={(value) => (
          <>
            <h3 className="order__total">Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={(order.totalAmount / 100) * 100}
        displayType={'text'}
        thousandSeparator={true}
      />
    </div>
  )
}

export default Order
