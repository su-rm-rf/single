<script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'

  import http from '../util/http'

  const router = useRouter()

  const userModel = reactive({
    email: '',
    password: ''
  })

  const handleSignin = () => {
    let canSubmit = true
    Object.keys(userModel).map(item => !userModel[item] && (canSubmit = false))
    if (!canSubmit) {
      alert('不能为空')
    } else {
      http.post(`/user/signin`, userModel).then(res => {
        if (res.data.status === 404) {
          alert('用户名或密码错误')
        } else {
          localStorage.token = res.data.token
          localStorage.user = JSON.stringify(res.data.user)
          router.push('/admin')
        }
      })
    }
  }
  
  const handleSignup = () => {
    router.push('/admin/user/signup')
  }
</script>

<template>
  <div class="signin">
    <header>
      <h3>登 录</h3>
    </header>
    <div class="addBody">
      <p>
        <label>邮 箱：</label>
        <input v-model="userModel.email" />
      </p>
      <p>
        <label>密 码：</label>
        <input type="password" v-model="userModel.password" />
      </p>
      <p class="submit">
        <input type="button" value="登录" @click="handleSignin" />
      </p>
      <p class="submit">
        <input type="button" value="注册" @click="handleSignup" />
      </p>
    </div>
  </div>
</template>