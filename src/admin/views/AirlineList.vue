<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  let flightAddFlag = ref(false)

  const AirlineAdd = () => {
    router.push('/admin/airline/add')
  }
  const FlightAdd = () => {
    flightAddFlag.value = !flightAddFlag.value
  }
</script>

<template>
  <div class="airlinelist">
    <header>
      <h3>航司列表</h3>
      <input type="button" value="新增航司" @click="AirlineAdd" />
    </header>
    <dl class="airline">
      <dt>
        <span>航司名称</span>
        <input type="button" value="新增航班" @click="FlightAdd" />
      </dt>
      <!-- 航班列表，展开收缩 -->
      <dd class="flight">
        <p>
          <label>出发地：</label><span>北京</span>
          <label>目的地：</label><span>上海</span>
        </p>
        <p>
          <label>出发日期</label>
          <span>2022-1018</span>
        </p>
        <p>
          <label>出发时间</label>
          <span>07:35</span>
          <label>抵达时间</label>
          <span>16:10</span>
        </p>
      </dd>
      <dd class="flight">
        <p>
          <label>出发地：</label><span>深圳</span>
          <label>目的地：</label><span>北京</span>
        </p>
        <p>
          <label>出发日期</label>
          <span>2022-1019</span>
        </p>
        <p>
          <label>出发时间</label>
          <span>09:15</span>
          <label>抵达时间</label>
          <span>18:30</span>
        </p>
      </dd>
    </dl>
    <dl class="airline">
      <dt>
        <span>航司名称</span>
        <input type="button" value="新增航班" @click="FlightAdd" />
      </dt>
      <!-- 航班列表，展开收缩 -->
      <dd class="flight">
        <p>
          <label>出发地：</label><span>上海</span>
          <label>目的地：</label><span>成都</span>
        </p>
        <p>
          <label>出发日期</label>
          <span>2022-1016</span>
        </p>
        <p>
          <label>出发时间</label>
          <span>09:25</span>
          <label>抵达时间</label>
          <span>20:30</span>
        </p>

      </dd>
      <dd class="flight">
        <p>
          <label>出发地：</label><span>北京</span>
          <label>目的地：</label><span>深圳</span>
        </p>
        <p>
          <label>出发日期</label>
          <span>2022-1018</span>
        </p>
        <p>
          <label>出发时间</label>
          <span>11:40</span>
          <label>抵达时间</label>
          <span>18:20</span>
        </p>
      </dd>
    </dl>
  </div>

  <div v-if="flightAddFlag">
    新增航班
  </div>

</template>