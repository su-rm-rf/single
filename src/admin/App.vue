<script setup>
  const props = defineProps(['props'])

  const goto = url => {
    singleSpaNavigate(url)
  }
</script>

<template>
  <div class="main">
    <a @click="goto('/goods')">商品管理</a>
  </div>
</template>
