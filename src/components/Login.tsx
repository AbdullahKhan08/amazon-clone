import { FormEvent, useState } from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config'
import axios from 'axios'
import { userState } from '../store/atoms/user'
import { useSetRecoilState } from 'recoil'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState)

  const signIn = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email: email, password: password },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        alert('User Logged in successfully')
        const data = response.data
        localStorage.setItem('token', data.token)
        setUser({
          isLoading: false,
          email: data.email,
          name: data.name,
        })
        setEmail('')
        setPassword('')
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="login">
      <Link to={'/'}>
        <img
          className="login__logo"
          src={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          }
        ></img>
      </Link>

      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => signIn(e)}
            className="login__signInButton"
          >
            Sign in
          </button>
        </form>
        <p>
          By continuing, you agree to AMAZON FAKE CLONE Conditions of Use and
          Privacy Notice.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="login__registerButton"
        >
          Create your amazon account
        </button>
      </div>
    </div>
  )
}

export default Login
