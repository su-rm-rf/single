<script setup>
  defineProps(['user'])
</script>

<template>
  <ul class="user">
    <li>
      <label>用户名：</label>
      <span>{{ user.name }}</span>
    </li>
    <li>
      <label>身份证号：</label>
      <span>{{ user.cardID }}</span>
    </li>
    <li>
      <label>手机号：</label>
      <span>{{ user.telephone }}</span>
    </li>
    <li>
      <label>邮 箱：</label>
      <span>{{ user.email }}</span>
    </li>
  </ul>
</template>