<script setup>
  const props = defineProps(['spagoto'])
  const { spagoto } = props
</script>

<template>
  <!-- <router-view /> -->
  <nav>
    <a @click="spagoto('/flight')">主页</a>
    <a @click="spagoto('/admin')">我的</a>
  </nav>
</template>