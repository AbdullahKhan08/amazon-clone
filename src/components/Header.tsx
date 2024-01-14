import '../styles/Header.css'
import logo from '../assets/logo2.png'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { Link } from 'react-router-dom'
// import { useStateValue } from '../StateProvider'
import { useRecoilState, useRecoilValue } from 'recoil'
import { basketDetails } from '../store/selectors/basket'
import { userState } from '../store/atoms/user'
// import { isUserLoading, userEmail, userName } from '../store/selectors/user'
function Header() {
  const [user, setUser] = useRecoilState(userState)
  //   const [{ basket }] = useStateValue() -> context provider
  const basket = useRecoilValue(basketDetails) // -> Recoil

  if (user.isLoading) {
    return <></>
  }

  if (user.email) {
    return (
      <div className="header">
        <Link to={'/'}>
          <img src={logo} className="header__logo"></img>
        </Link>
        <div className="header__search">
          <input className="header__searchInput" type="text"></input>
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <div
            className="header__option"
            onClick={() => {
              localStorage.setItem('token', '')
              setUser({
                isLoading: false,
                email: '',
                name: '',
              })
            }}
          >
            <span className="header__optionLineOne">Hello {user.name}</span>
            <span className="header__optionLineTwo">Logout</span>
          </div>

          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>

          <Link to={'/checkout'}>
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className="header">
          <Link to={'/'}>
            <img src={logo} className="header__logo"></img>
          </Link>
          <div className="header__search">
            <input className="header__searchInput" type="text"></input>
            <SearchIcon className="header__searchIcon" />
          </div>

          <div className="header__nav">
            <Link to={'/login'}>
              <div className="header__option">
                <span className="header__optionLineOne">Hello Guest</span>
                <span className="header__optionLineTwo">Sign In</span>
              </div>
            </Link>
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>

            <Link to={'/checkout'}>
              <div className="header__optionBasket">
                <ShoppingBasketIcon />
                <span className="header__optionLineTwo header__basketCount">
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Header
