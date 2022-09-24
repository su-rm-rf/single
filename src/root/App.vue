<script setup>
  import { useRouter } from 'vue-router'

  const props = defineProps(['goto'])
  const { goto } = props

  const router = useRouter()
  router.push('/shop')
</script>

<template>
  <nav>
    <a @click="goto('/shop')">主页</a>
    <router-link to="/cart">购物车</router-link>
    <a @click="goto('/admin')">我的</a>
  </nav>
</template>