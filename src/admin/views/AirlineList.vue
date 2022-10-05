<script setup>
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'

  import http from '../util/http'
  
  const router = useRouter()

  let airlines = ref([])
  let airlineAddFlag = ref(false)
  const airlineModel = reactive({
    name: '',
    code: ''
  })

  const AirlineAddToggle = () => {
    airlineAddFlag.value = !airlineAddFlag.value
  }
  const FlightAdd = (aid) => {
    router.push(`/admin/flight/add?aid=${ aid }`)
  }

  const getAirlines = () => {
    http.get('/airline/list').then(res => {
      airlines.value = res.data
    })
  }

  getAirlines()

  const AirlineAdd = () => {
    if (!airlineModel.name || !airlineModel.code) {
      alert('不能为空')
    } else {
      http.post('/airline/add', airlineModel).then(res => {
        airlineAddFlag.value = false
        getAirlines()
      })
    }
  }

  const seatManage = (fid) => {
    router.push(`/admin/flight/seats?fid=${ fid }`)
  }
</script>

<template>
  <div class="airlinelist">
    <header>
      <h3>航司列表</h3>
      <input type="button" value="新增航司" @click="AirlineAddToggle" />
    </header>
    <dl class="airline" v-for="(airline, idx) in airlines" :key="idx">
      <dt>
        <span>{{ airline.name }}</span>
        <input type="button" value="新增航班" @click="FlightAdd(airline.aid)" />
      </dt>
      <dd class="flight" v-for="(flight, idx2) in airline.flights" :key="idx2">
        <p class="row">
          <p>
            <label>编 号：</label>
            <span>{{ flight.code }}</span>
          </p>
          <p class="action">
            <input type="button" value="舱位管理" @click="seatManage(flight.fid)" />
          </p>
        </p>
        <p class="row">
          <p>
            <label>出发地：</label>
            <span>{{ flight.depatureName }}</span>
          </p>
          <p>
            <label>目的地：</label>
            <span>{{ flight.destinationName }}</span>
          </p>
        </p>
        <p class="row">
          <label>出发日期：</label>
          <span>{{ flight.leaveDate }}</span>
        </p>
        <p class="row">
          <p>
            <label>出发时间：</label>
            <span>{{ flight.leaveTime }}</span>
          </p>
          <p>
            <label>抵达时间：</label>
            <span>{{ flight.arriveTime }}</span>
          </p>
        </p>
      </dd>
    </dl>

    <div v-if="airlineAddFlag" class="mask"></div>
    <div v-if="airlineAddFlag" class="popup-wrap">
      <header>
        <h4>新增航司</h4>
        <i @click="AirlineAddToggle">X</i>
      </header>
      <div class="popup-body">
        <p>
          <label>名 称：</label>
          <input v-model="airlineModel.name" />
        </p>
        <p>
          <label>编 号：</label>
          <input v-model="airlineModel.code" />
        </p>
        <p class="submit">
          <input type="button" value="添 加" @click="AirlineAdd" />
        </p>
      </div>
    </div>
  </div>


</template>