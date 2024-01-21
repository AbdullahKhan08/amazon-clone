import { useEffect, useState } from 'react'
import '../styles/Orders.css'
import { BASE_URL } from '../config'
import axios from 'axios'
import Order from './Order'
import { useRecoilValue } from 'recoil'
import { userState } from '../store/atoms/user'

function Orders() {
  const [orders, setOrders] = useState([])

  const user = useRecoilValue(userState)

  const fetchOrders = async () => {
    const response = await axios.get(`${BASE_URL}/orders/fetchOrders`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })

    if (response.status === 200) {
      console.log(response.data.orders)
      setOrders(response.data.orders)
    }
  }

  useEffect(() => {
    if (user.email) {
      fetchOrders()
    } else {
      setOrders([])
    }
    console.log('orders', orders)
  }, [user])

  if (user.email) {
    return (
      <div className="orders">
        <h1>Your Orders</h1>

        <div className="orders__order">
          {orders.map((order, index) => (
            <Order key={index} order={order} />
          ))}
        </div>
      </div>
    )
  } else {
    return <h1>Please sign in to view orders</h1>
  }
}

export default Orders
