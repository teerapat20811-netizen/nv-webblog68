<template>
  <div>
    <h1>สร้างเมนูกาแฟ</h1>
    <form v-on:submit.prevent="createCoffee">
      <p>ชื่อเมนู: <input type="text" v-model="coffee.name"></p>
      <p>ราคา: <input type="number" v-model="coffee.price"></p>
      <p>ประเภท: <input type="text" v-model="coffee.type"></p>

      <p>สถานะ: <input type="text" v-model="coffee.status"></p>

      <p><button type="submit">บันทึก</button></p>
    </form>
  </div>
</template>

<script>
// ส่วน Script ใช้ของเดิมของคุณได้เลยครับ
import CoffeesService from '../../services/CoffeesService'

export default {
  data () {
    return {
      coffee: {
        name: '',
        price: '',
        type: '',
        status: '' // มีตัวแปรนี้รอรับค่าอยู่แล้ว
      }
    }
  },
  methods: {
    async createCoffee () {
      try {
        await CoffeesService.post(this.coffee)
        this.$router.push({ name: 'coffees' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>