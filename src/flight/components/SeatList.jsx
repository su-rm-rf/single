import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import Signin from '../components/Signin'
import Signup from '../components/Signup'

export default function SeatList(props) {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isSignin: !!localStorage.token,
    signinPop: false
  })

  const preOrder = (sid) => {
    if (state.isSignin) {
      navigate(`/flight/checkout?sid=${ sid }`)
    } else {
      setState({
        isSignin: state.isSignin,
        signinPop: !state.signinPop
      })
    }
  }

  const SigninToggle = () => {
    setState(Object.assign({}, state, {
      isSignin: !!localStorage.token,
      signinPop: !state.signinPop,
    }))
  }
  
  const handleSignin = async (userModel) => {
    await props.handleSignin(userModel)
    SigninToggle()
  }

  const handleSignup = async (userModel) => {
    await props.handleSignup(userModel)
    SigninToggle()
  }

  const toggleInOrUp = (val) => {
    props.toggleInOrUp(val)
  }

  return (
    <div>
      <ul className="seat-list">
        {
          props.seats.map((seat, idx) => {
            return (
              <li key={ idx }>
                <label></label>
                <label>{ seat.name }</label>
                <span>¥{ seat.price }</span>
                <input type="button" value="预 订" onClick={ () => preOrder(seat.sid) } />
              </li>
            )
          })
        }
      </ul>
      
      {
        !state.isSignin && state.signinPop && props.inOrUp === 'in' && 
        <Signin handleSignin={ handleSignin } SigninToggle={ SigninToggle } toggleInOrUp={ toggleInOrUp } />
      }
      {
        !state.isSignin && state.signinPop && props.inOrUp === 'up' && 
        <Signup handleSignup={ handleSignup } SigninToggle={ SigninToggle } toggleInOrUp={ toggleInOrUp } />
      }
    </div>
  )
}