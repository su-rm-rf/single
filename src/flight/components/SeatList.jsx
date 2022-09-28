import React, { useState } from 'react'
import { useNavigate } from 'react-router'

import Signin from '../components/Signin'

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
      signinPop: !state.signinPop
    }))
  }
  
  const handleSignin = async (userModel) => {
    await props.handleSignin(userModel)
    SigninToggle()
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
        !state.isSignin && state.signinPop &&
        <Signin handleSignin={ handleSignin } SigninToggle={ SigninToggle } />
      }
    </div>
  )
}