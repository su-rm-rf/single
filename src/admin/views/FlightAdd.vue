<script setup>
  import { ref, reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import http from '../util/http'
  import moment from 'moment'

  const routes = useRoute()
  const router = useRouter()

  const flightModel = reactive({
    code: '',
    depature: '',
    destination: '',
    leaveDate: moment().format('YYYY-MM-DD'),
    leaveTime: moment().format('HH:MM'),
    arriveTime: moment().format('HH:MM'),
    airline: routes.query.aid
  })

  let cities = ref([])

  http.get('/city/list').then(res => {
    cities.value = res.data
    flightModel.depature = cities.value[0].code
    flightModel.destination = cities.value[1].code
  })

  const FlightAdd = () => {
    let canAdd = true
    Object.keys(flightModel).map(key => !flightModel[key] && (canAdd = false) )
    if (!canAdd) {
      alert('不能为空')
    } else {
      http.post('/flight/add', flightModel).then(res => {
        router.back()
      })
    }
  }
</script>

<template>
  <div class="flightAdd">
    <header>
      <h3>新增航班</h3>
    </header>
    <div class="addBody">
      <p>
        <label>编 号：</label>
        <input v-model="flightModel.code" />
      </p>
      <p>
        <label>出发地：</label>
        <select v-model="flightModel.depature">
          <option v-for="(city, idx) in cities" :key="idx" :value="city.code">{{ city.name }}</option>
        </select>
      </p>
      <p>
        <label>目的地：</label>
        <select v-model="flightModel.destination">
          <option v-for="(city, idx) in cities" :key="idx" :value="city.code">{{ city.name }}</option>
        </select>
      </p>
      <p>
        <label>出发日期：</label>
        <input type="date" v-model="flightModel.leaveDate" min="flightModel.leaveDate" />
      </p>
      <p>
        <label>出发时间：</label>
        <input type="time" v-model="flightModel.leaveTime" />
      </p>
      <p>
        <label>抵达时间：</label>
        <input type="time" v-model="flightModel.arriveTime" />
      </p>
      <p class="submit">
        <input type="button" value="添 加" @click="FlightAdd" />
      </p>
    </div>
  </div>
</template>