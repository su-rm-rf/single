import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import http from '../util/http'

import SeatInfo from '../components/SeatInfo'

export default function Checkout() {
  
  const [ searchParams ] = useSearchParams()
  const navigate = useNavigate()

  const sid = searchParams.get('sid')
  const passengerModel = {
    userID: JSON.parse(localStorage.user)._id,
    name: '',
    cardID: '',
    telephone: '',
    email: '',
    sid
  }

  const [ seatInfo, setSeatInfo ] = useState({})
  useEffect(() => {
    http.get(`/flight/seatinfo?sid=${ sid }`).then(res => {
      setSeatInfo(res.data)
    })
  }, [])

  const setName = (ev) => {
    passengerModel.name = ev.target.value
  }
  const setCardID = (ev) => {
    passengerModel.cardID = ev.target.value
  }
  const setTelephone = (ev) => {
    passengerModel.telephone = ev.target.value
  }
  const setEmail = (ev) => {
    passengerModel.email = ev.target.value
  }

  const [ loading, setLoading ] = useState(false)
  const [ order, setOrder ] = useState({})
  const handleCheckout = () => {
    let canSubmit = true
    Object.keys(passengerModel).map(item => !passengerModel[item] && (canSubmit = false))
    if (!canSubmit) {
      alert('不能为空')
    } else {
      canSubmit = true
      http.post(`/flight/checkout`, passengerModel).then(res => {
        setLoading(true)
        setOrder(res.data)
      })
    }
  }
  
  const handlePay = (willPay) => {
    const oid = order._id
    if (willPay) {
      http.post(`/order/update`, { oid }).then(res => {
        setLoading(false)
        navigate(`/flight/order?oid=${ res.data._id }`)
      })
    } else {
      navigate(`/flight/order?oid=${ oid }`)
    }
  }
  
  const orderPayToggle = () => {
    setLoading(false)
  }

  return (
    <div className="checkout">
      {
        <SeatInfo seatInfo={ seatInfo } />
      }
      <div className="passenger">
        <header>
          <h3>乘机人信息</h3>
        </header>
        <div className="checkout-body">
          <p>
            <label>姓 名：</label>
            <input type="text" onChange={ setName } />
          </p>
          <p>
            <label>身份证：</label>
            <input type="number" onChange={ setCardID } />
          </p>
          <p>
            <label>手机号：</label>
            <input type="number" onChange={ setTelephone } />
          </p>
          <p>
            <label>邮 箱：</label>
            <input type="email" onChange={ setEmail } />
          </p>
          <p className="submit">
            <input type="button" value="提交订单" onClick={ handleCheckout } />
          </p>
        </div>
      </div>

      {
        loading && 
        <div>
          <div className="mask"></div>
          <div className="popup-wrap">
            <header>
              <h4>订单支付</h4>
              <i onClick={ orderPayToggle }>X</i>
            </header>
            <div className="popup-body">
              <p>订单ID：{ order._id }</p>
              <p>金 额：¥{ order.price }</p>
              <p className="submit">
                <input type="button" value="立即支付" onClick={ () => handlePay(true) } />
              </p>
              <p className="submit">
                <input type="button" value="暂不支付" onClick={ () => handlePay(false) } />
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  )
}