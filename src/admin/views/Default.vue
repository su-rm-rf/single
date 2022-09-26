<script setup>
  import User from '../components/User'

  const user = {
    userName: 'yhl',
    role: 1,
    cardID: 421181,
    telephone: 1583743,
    email: 'yuhualing@163.com'
  }
</script>

<template>
  <div class="admin">
    <User :user="user" />
    <nav class="navHeader">
      <router-link to="/admin/order/list">订单列表</router-link>
      <!-- <a onclick="spagoto('/manage')">航司航班舱位管理</a> -->
      <router-link to="/admin/airline/list" v-if="user.role === 1">航司列表</router-link>
    </nav>
  </div>
</template>