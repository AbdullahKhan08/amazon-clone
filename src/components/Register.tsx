import { FormEvent, useState } from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import axios from 'axios'
import { BASE_URL } from '../config'
import { userState } from '../store/atoms/user'
import { useSetRecoilState } from 'recoil'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useSetRecoilState(userState)

  const navigate = useNavigate()

  const signUp = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${BASE_URL}/user/register`,
        { name: name, email: email, password: password },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      )

      if (response.status === 201) {
        alert('User created')
        const data = response.data
        localStorage.setItem('token', data.token)
        setUser({
          isLoading: false,
          email: data.email,
          name: data.name,
        })
        setEmail('')
        setName('')
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
        <h1>Sign Up</h1>
        <form>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            onClick={(e) => signUp(e)}
            className="login__signInButton"
          >
            Sign Up
          </button>
        </form>
        <p>
          By continuing, you agree to AMAZON FAKE CLONE Conditions of Use and
          Privacy Notice.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="login__registerButton"
        >
          Login to your Amazon account
        </button>
      </div>
    </div>
  )
}

export default Register
