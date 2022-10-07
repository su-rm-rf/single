import React from 'react'

export default function Signin(props) {
  
  const userModel = {
    email: '',
    password: ''
  }

  const setEmail = (ev) => {
    userModel.email = ev.target.value
  }
  const setPwd = (ev) => {
    userModel.password = ev.target.value
  }
  
  const SigninToggle = () => {
    props.SigninToggle()
  }
  const handleSignin = () => {
    props.handleSignin(userModel)
  }

  const toggleInOrUp = () => {
    props.toggleInOrUp('up')
  }

  return (
    <div>
      <div className="mask"></div>
      <div className="popup-wrap">
        <header>
          <h3>登 录</h3>
          <i onClick={ SigninToggle }>X</i>
        </header>
        <div className="popup-body">
          <p>
            <label>邮 箱：</label>
            <input type="text" onChange={ setEmail } />
          </p>
          <p>
            <label>密 码：</label>
            <input type="password" onChange={ setPwd } />
          </p>
          <p className="submit">
            <input type="button" value="登 录" onClick={ handleSignin } />
          </p>
          <p className="submit">
            <input type="button" value="注 册" onClick={ toggleInOrUp } />
          </p>
        </div>
      </div>
    </div>
  )
}