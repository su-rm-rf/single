import React from 'react'

export default function Signup(props) {
  
  const userModel = {
    userName: '',
    password: '',
    repassword: '',
    cardID: '',
    telephone: '',
    email: '',
  }

  const setName = (ev) => {
    userModel.userName = ev.target.value
  }
  const setPwd = (ev) => {
    userModel.password = ev.target.value
  }
  const setCPwd = (ev) => {
    userModel.repassword = ev.target.value
  }
  const setCard = (ev) => {
    userModel.cardID = ev.target.value
  }
  const setTele = (ev) => {
    userModel.telephone = ev.target.value
  }
  const setEmail = (ev) => {
    userModel.email = ev.target.value
  }
  
  const SigninToggle = () => {
    props.SigninToggle()
  }
  const toggleInOrUp = () => {
    props.toggleInOrUp('in')
  }

  const handleSignup = () => {
    props.handleSignup(userModel)
  }

  return (
    <div>
      <div className="mask"></div>
      <div className="popup-wrap">
        <header>
          <h3>注 册</h3>
          <i onClick={ SigninToggle }>X</i>
        </header>
        <div className="popup-body">
          <p>
            <label>用户名：</label>
            <input type="text" onChange={ setName } />
          </p>
          <p>
            <label>密 码：</label>
            <input type="password" onChange={ setPwd } />
          </p>
          <p>
            <label>确认密码：</label>
            <input type="password" onChange={ setCPwd } />
          </p>
          <p>
            <label>身份证：</label>
            <input type="number" onChange={ setCard } />
          </p>
          <p>
            <label>手机号：</label>
            <input type="number" onChange={ setTele } />
          </p>
          <p>
            <label>邮 箱：</label>
            <input type="email" onChange={ setEmail } />
          </p>
          <p className="submit">
            <input type="button" value="注 册" onClick={ handleSignup } />
          </p>
          <p className="submit">
            <input type="button" value="登 录" onClick={ toggleInOrUp } />
          </p>
        </div>
      </div>
    </div>
  )
}