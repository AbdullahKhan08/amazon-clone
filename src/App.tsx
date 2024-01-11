import Home from './components/Home'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  )
}

export default App
