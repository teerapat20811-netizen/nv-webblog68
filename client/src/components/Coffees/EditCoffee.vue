<template>
  <div>
    <h1>แก้ไขเมนูกาแฟ</h1>
    <form v-on:submit.prevent="editCoffee">
      <p>ชื่อเมนู: <input type="text" v-model="coffee.name"></p>
      
      <div style="background-color: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px;">
        <p><b>รูปภาพปัจจุบัน:</b></p>
        <div v-if="coffee.image">
          <img :src="'http://localhost:8081/assets/uploads/' + coffee.image" alt="coffee image" style="max-width: 200px; border-radius: 8px; margin-bottom: 10px;">
        </div>
        <p v-else style="color: red;">ยังไม่มีรูปภาพ</p>
        
        <upload-image @uploaded="onUploaded"></upload-image>
      </div>
      <p>ราคา: <input type="number" v-model="coffee.price"></p>
      <p>ประเภท: <input type="text" v-model="coffee.type"></p>
      <p>สถานะ: <input type="text" v-model="coffee.status"></p>
      
      <p>
        <button type="submit">อัพเดทข้อมูล</button>
        <button type="button" v-on:click="$router.back()" style="margin-left: 10px;">ยกเลิก</button>
      </p>
    </form>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import UploadImage from '../Utils/Upload.vue' // 1. Import Component อัปโหลดรูปมาใช้

export default {
  components: {
    UploadImage // 2. ลงทะเบียน
  },
  data () {
    return {
      coffee: {
        name: '',
        price: '',
        type: '',
        status: '',
        image: '' // 3. อย่าลืมให้มีฟิลด์ image มารับค่า
      }
    }
  },
  async created () {
    try {
      let coffeeId = this.$route.params.coffeeId
      this.coffee = (await CoffeesService.show(coffeeId)).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 4. ฟังก์ชันรับชื่อไฟล์ใหม่ กรณี User อัปโหลดรูปใหม่ทับ
    onUploaded (filename) {
      this.coffee.image = filename
      console.log('เปลี่ยนรูปภาพใหม่เป็น:', filename)
    },
    async editCoffee () {
      try {
        await CoffeesService.put(this.coffee)
        this.$router.push({ name: 'coffees' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>