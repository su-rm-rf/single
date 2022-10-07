<script setup>
  import { ref } from 'vue'
  import http from '../util/http'
  
  const user = JSON.parse(localStorage.user)
  const orders = ref([])
  const orderPayFlag = ref(false)
  const selectedOrder = ref({})

  const getOrderList = () => {
    http.get(`/order/list?uid=${ user._id }`).then(res => {
      orders.value = res.data
    })
  }

  getOrderList()

  const orderManage = (order) => {
    if (order.statusCode === 0) {
      orderPayFlag.value = true
      selectedOrder.value = order
    }
  }
  
  const orderPayToggle = () => {
    orderPayFlag.value = !orderPayFlag.value
  }
  
  const orderPay = (willPay) => {
    if (!willPay) {
      orderPayFlag.value = false
    } else {
      http.post(`/order/update`, {
        oid: selectedOrder.value.id
      }).then(res => {
        getOrderList()
        orderPayFlag.value = false
      })
    }
  }
</script>

<template>
  <div class="orderList2">
    <header>
      <h3>订单列表</h3>
    </header>
    <dl>
      <dd v-if="!orders.length">暂无订单</dd>
      <dd class="order2" v-for="(order, idx) in orders" :key="idx">
        <p class="row">
          <p>
            <label>订单编号：</label>
            <span>{{ order.id }}</span>
          </p>
          <p class="action">
            <span @click="orderManage(order)">{{ order.status }}</span>
          </p>
        </p>
        <p class="row">
          <label>航司：</label>
          <span>{{ order.flight.flightName }}</span>
        </p>
        <p class="row">
          <p>
            <label>出发地：</label>
            <span>{{ order.flight.depatureName }}</span>
          </p>
          <p>
            <label>目的地：</label>
            <span>{{ order.flight.destinationName }}</span>
          </p>
        </p>
        <p class="row">
          <label>出发日期：</label>
          <span>{{ order.flight.leaveDate }}</span>
        </p>
        <p class="row">
          <p>
            <label>出发时间：</label>
            <span>{{ order.flight.leaveTime }}</span>
          </p>
          <p>
            <label>抵达时间：</label>
            <span>{{ order.flight.arriveTime }}</span>
          </p>
        </p>
        <p class="row">
          <p>
            <label>舱 位：</label>
            <span>{{ order.seat.name }}</span>
          </p>
          <p>
            <label>价 格：</label>
            <span>¥{{ order.price }}</span>
          </p>
        </p>
        <p class="row">
          <label>乘机人姓名：</label>
          <span>{{ order.passenger.name }}</span>
        </p>
        <p class="row">
          <label>乘机人手机号：</label>
          <span>{{ order.passenger.telephone }}</span>
        </p>
      </dd>
    </dl>

    <div v-if="orderPayFlag" class="mask"></div>
    <div v-if="orderPayFlag" class="popup-wrap">
      <header>
        <h4>订单支付</h4>
        <i @click="orderPayToggle">X</i>
      </header>
      <div class="popup-body">
        <p>订单ID：{{ selectedOrder.id }}</p>
        <p>价 格：¥{{ selectedOrder.price }}</p>
        <p class="submit">
          <input type="button" value="立即支付" @click="orderPay(true)" />
        </p>
        <p class="submit">
          <input type="button" value="取消支付" @click="orderPay(false)" />
        </p>
      </div>
    </div>
  </div>
</template>