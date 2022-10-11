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
    <li class="role">
      <label>角 色：</label>
      <span>{{ user.role === 1 ? '普通用户' : '管理员' }}</span>
    </li>
  </ul>
</template>