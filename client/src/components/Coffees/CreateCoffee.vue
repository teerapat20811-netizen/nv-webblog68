<template>
  <div>
    <h1>สร้างเมนูกาแฟ</h1>
    <form v-on:submit.prevent="createCoffee">
      <p>ชื่อเมนู: <input type="text" v-model="coffee.name"></p>
      
      <upload-image @uploaded="onUploaded"></upload-image>
      
      <p>ราคา: <input type="number" v-model="coffee.price"></p>
      <p>ประเภท: <input type="text" v-model="coffee.type"></p>
      <p>สถานะ: <input type="text" v-model="coffee.status"></p>
      <p><button type="submit">บันทึก</button></p>
    </form>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import UploadImage from '../Utils/Upload.vue' // 1. Import มา

export default {
  components: { UploadImage }, // 2. ลงทะเบียน Component
  data () {
    return {
      coffee: {
        name: '', price: '', type: '', status: '',
        image: '' // 3. เพิ่มฟิลด์รับชื่อรูปภาพ
      }
    }
  },
  methods: {
    onUploaded (filename) {
      this.coffee.image = filename // 4. รับชื่อไฟล์จาก Component ลูก
    },
    async createCoffee () {
      try {
        await CoffeesService.post(this.coffee)
        this.$router.push({ name: 'coffees' })
      } catch (err) { console.log(err) }
    }
  }
}
</script>