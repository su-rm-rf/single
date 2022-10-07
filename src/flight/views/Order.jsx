import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import http from '../util/http'

import SeatInfo from '../components/SeatInfo'

export default function Order(props) {
  
  const orderModel = {}

  const [ orderInfo, setOrderInfo ] = useState({})
  const [ seatInfo, setSeatInfo ] = useState({})
  const [ passengerInfo, setPassengerInfo ] = useState({})

  const navigate = useNavigate()
  const [ searchParams ] = useSearchParams()

  const oid = searchParams.get('oid')

  const handleBack = () => {
    navigate('/admin/order/list')
  }

  useEffect(() => {
    http.get(`/flight/order?oid=${ oid }`).then(res => {
      setOrderInfo({
        oid: res.data.oid,
        status: res.data.status,
        price: res.data.price,
      })
      setSeatInfo(res.data.seatInfo)
      setPassengerInfo(res.data.passengerInfo)
    })
  }, [])

  return (
    <div className="order">
      <div className="seatinfo">
        <header>
          <h3>订单信息</h3>
        </header>
        <div className="seatinfo-body">
          <p>
            <label>订单编号：</label>
            <span>{ orderInfo.oid }</span>
          </p>
          <p>
            <label>订单状态：</label>
            <span>{ orderInfo.status }</span>
          </p>
          <p>
            <label>航 班：</label>
            <span>{ seatInfo.flightName }</span>
          </p>
          <p>
            <label>舱 位：</label>
            <span>{ seatInfo.seatName }</span>
          </p>
          <p>
            <label>价 格：</label>
            <span>¥{ orderInfo.price }</span>
          </p>
        </div>
      </div>
      <div className="passenger">
        <header>
          <h3>乘机人信息</h3>
        </header>
        <div className="order-body">
          <p>
            <label>姓 名：</label>
            <span>{ passengerInfo.name }</span>
          </p>
          <p>
            <label>身份证：</label>
            <span>{ passengerInfo.cardID }</span>
          </p>
          <p>
            <label>手机号：</label>
            <span>{ passengerInfo.telephone }</span>
          </p>
          <p>
            <label>邮 箱：</label>
            <span>{ passengerInfo.email }</span>
          </p>
          <p className="submit">
            <input type="button" value="查看我的订单" onClick={ handleBack } />
          </p>
        </div>
      </div>
    </div>
  )
}