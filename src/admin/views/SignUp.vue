<script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'

  import http from '../util/http'

  const router = useRouter()

  const userModel = reactive({
    userName: '',
    password: '',
    repassword: '',
    cardID: '',
    telephone: '',
    email: ''
  })

  const handleSignup = () => {
    let canSubmit = true
    Object.keys(userModel).map(item => !userModel[item] && (canSubmit = false))
    if (!canSubmit) {
      alert('不能为空')
    } else {
      http.post(`/user/signup`, userModel).then(res => {
        localStorage.token = res.data.token
        localStorage.user = JSON.stringify(res.data.user)
        router.push('/admin')
      })
    }
  }

  const handleSignin = () => {
    router.push('/admin/user/signin')
  }
</script>

<template>
  <div class="signup">
    <div class="flightAdd">
      <header>
        <h3>注 册</h3>
      </header>
      <div class="addBody">
        <p>
          <label>用户名：</label>
          <input v-model="userModel.userName" />
        </p>
        <p>
          <label>密 码：</label>
          <input type="password" v-model="userModel.password" />
        </p>
        <p>
          <label>确认密码：</label>
          <input type="password" v-model="userModel.repassword" />
        </p>
        <p>
          <label>身份证：</label>
          <input type="number" v-model="userModel.cardID" />
        </p>
        <p>
          <label>手机号：</label>
          <input type="number" v-model="userModel.telephone" />
        </p>
        <p>
          <label>邮 箱：</label>
          <input type="email" v-model="userModel.email" />
        </p>
        <p class="submit">
          <input type="button" value="注 册" @click="handleSignup" />
        </p>
        <p class="submit">
          <input type="button" value="登 录" @click="handleSignin" />
        </p>
      </div>
    </div>
  </div>
</template>