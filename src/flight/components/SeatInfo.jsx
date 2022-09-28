import React from 'react'

import http from '../util/http'

export default function SeatInfo(props) {
  
  const seatInfoModel = props.seatInfo

  return (
    <div className="seatinfo">
      <header>
        <h3>航班信息</h3>
      </header>
      <div className="seatinfo-body">
        <p>
          <label>航 班：</label>
          <span>{ seatInfoModel.flightName }</span>
        </p>
        <p>
          <label>舱 位：</label>
          <span>{ seatInfoModel.seatName }</span>
        </p>
        <p>
          <label>价 格：</label>
          <span>¥{ seatInfoModel.price }</span>
        </p>
      </div>
    </div>
  )
}