<template>
  <div>
    <h1>ดูข้อมูลเมนูกาแฟ</h1>
    <div v-if="coffee">
      <p><b>ID:</b> {{ coffee.id }}</p>
      <p><b>ชื่อเมนู:</b> {{ coffee.name }}</p>
      <p><b>ราคา:</b> {{ coffee.price }} บาท</p>
      <p><b>ประเภท:</b> {{ coffee.type }}</p>
      
      <p><b>สถานะ:</b> {{ coffee.status }}</p>
    </div>
    <p>
      <button v-on:click="$router.back()">กลับ</button>
    </p>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'

export default {
  data () {
    return {
      coffee: null
    }
  },
  async created () {
    try {
      let coffeeId = this.$route.params.coffeeId
      this.coffee = (await CoffeesService.show(coffeeId)).data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>