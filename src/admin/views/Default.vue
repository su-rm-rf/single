<script setup>
  import { ref, reactive, toRefs } from 'vue'

  import User from '../components/User'

  import http from '../util/http'

  const user2 = JSON.parse(localStorage.user)

  let userModel = ref({})

  http.get(`/user/${user2._id}`).then(res => {
    userModel.value = res.data
  })
</script>

<template>
  <div class="admin">
    <User :user="userModel" />
    <nav class="navHeader">
      <router-link to="/admin/order/list">订单列表</router-link>
      <!-- <a onclick="spagoto('/manage')">航司航班舱位管理</a> -->
      <router-link to="/admin/airline/list" v-if="userModel.role === 1">航司列表</router-link>
    </nav>
  </div>
</template>