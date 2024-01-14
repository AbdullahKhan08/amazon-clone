import Home from './components/Home'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import Login from './components/Login'
import Register from './components/Register'
import { useEffect } from 'react'
import { userState } from './store/atoms/user'
import { BASE_URL } from './config'
import axios from 'axios'

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          {/* <Header/> */}
          <InitUser />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            ></Route>
            <Route
              path="/checkout"
              element={
                <>
                  <Header />
                  <Checkout />
                </>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  )

  function InitUser() {
    const setUser = useSetRecoilState(userState)

    const init = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/me`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })

        if (response.data.email) {
          setUser({
            isLoading: false,
            email: response.data.email,
            name: response.data.name,
          })
        } else {
          setUser({
            isLoading: false,
            email: '',
            name: '',
          })
        }
      } catch (e) {
        setUser({
          isLoading: false,
          email: '',
          name: '',
        })
      }
    }

    useEffect(() => {
      init()
    }, [])

    return <></>
  }
}

export default App
