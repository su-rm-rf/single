<script setup>
  const props = defineProps(['props'])

  // const spagoto = url => {
  //   window.spagoto(url)
  // }
</script>

<template>
  <div class="main">
    <router-link to="/admin/order/list">订单列表a</router-link>
    <a onclick="spagoto('/manage')">航司航班舱位管理</a>
  </div>
  
  <router-view />
</template>
