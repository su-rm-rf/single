<script setup>
  import { ref, reactive } from 'vue'
  import { useRoute } from 'vue-router'
  import http from '../util/http'

  const routes = useRoute()

  const seatAddFlag = ref(false)
  const seats = ref([])

  const fid = routes.query.fid
  let seatModel = reactive({
    type: 'F',
    price: '',
    flight: fid
  })

  const SeatAddToggle = () => {
    seatAddFlag.value = !seatAddFlag.value
  }

  const getSeatList = () => {
    http.get(`/seat/list?fid=${ fid }`).then(res => {
      seats.value = res.data
    })
  }

  getSeatList()

  const seatAdd = () => {
    if (!seatModel.price) {
      alert('不能为空')
    } else {
      http.post('/seat/add', seatModel).then(res => {
        SeatAddToggle()
        getSeatList()
        seatModel.type = 'F'
        seatModel.price = ''
      })
    }
  }

  const SeatManage = (sid) => {
    http.get(`/seat/${ sid }`).then(res => {
      seatModel.sid = sid
      seatModel.type = res.data.type
      seatModel.price = res.data.price
      SeatAddToggle()
    })
  }
</script>

<template>
  <div class="seatlist">
    <header>
      <h3>舱位列表</h3>
      <input type="button" value="新增舱位" @click="SeatAddToggle" />
    </header>
    <div v-if="!seats.length">暂无舱位</div>
    <div v-if="seats.length">
      <dl class="seat">
        <dd class="flight" v-for="(seat, idx) in seats" :key="idx">
          <p class="row">
            <p>
              <label>类 型：</label>
              <span>{{ seat.name }}</span>
            </p>
            <p class="action">
              <input type="button" value="编辑" @click="SeatManage(seat.sid)" />
            </p>
          </p>
          <p class="row">
            <p>
              <label>价 格：</label>
              <span>¥{{ seat.price }}</span>
            </p>
          </p>
        </dd>
      </dl>
    </div>

    <div v-if="seatAddFlag" class="mask"></div>
    <div v-if="seatAddFlag" class="popup-wrap">
      <header>
        <h4>新增舱位</h4>
        <i @click="SeatAddToggle">X</i>
      </header>
      <div class="popup-body">
        <p>
          <label>类 型：</label>
          <select v-model="seatModel.type">
            <option value="F">头等舱</option>
            <option value="C">公务舱</option>
            <option value="Y">经济舱</option>
          </select>
        </p>
        <p>
          <label>价 格：</label>
          <input v-model="seatModel.price" />
        </p>
        <p class="submit">
          <input type="button" value="提 交" @click="seatAdd" />
        </p>
      </div>
    </div>

  </div>
</template>