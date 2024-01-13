import Home from './components/Home'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import { RecoilRoot } from 'recoil'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          {/* <Header/> */}
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
}

export default App
