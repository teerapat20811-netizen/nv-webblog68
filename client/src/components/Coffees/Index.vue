<template>
  <div>
    <h2>รายการเมนูกาแฟ</h2>
    
    <div v-if="isUserLoggedIn">
      <p>ยินดีต้อนรับ Admin | <button v-on:click="logout">Logout</button></p>
    </div>
    <div v-else>
      <p>บุคคลทั่วไป (เข้าสู่ระบบเพื่อจัดการข้อมูล)</p>
    </div>

    <p>
      <button v-if="isUserLoggedIn" v-on:click="navigateTo('/coffee/create')">
        สร้างเมนูใหม่
      </button>
    </p>

    <h2>จำนวนเมนู {{ coffees.length }}</h2>

    <div v-for="coffee in coffees" v-bind:key="coffee.id">
      <p>id: {{ coffee.id }}</p>
      
      <p style="display: flex; align-items: center; gap: 10px;">
        <img 
          v-if="coffee.image" 
          :src="'http://localhost:8081/public/uploads/' + coffee.image" 
          alt="coffee image" 
          style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 1px solid #ccc;"
        >
        <span v-else style="width: 50px; height: 50px; border-radius: 50%; background-color: #eee; display: inline-block; border: 1px solid #ccc;"></span>
        <b>ชื่อเมนู: {{ coffee.name }}</b>
      </p>
      
      <p>ราคา: {{ coffee.price }}</p>
      <p>ประเภท: {{ coffee.type }}</p>
      <p>สถานะ: {{ coffee.status }}</p>
      <p>
        <button v-on:click="navigateTo('/coffee/'+ coffee.id)">ดูข้อมูล</button>
        
        <button v-if="isUserLoggedIn" v-on:click="navigateTo('/coffee/edit/'+ coffee.id)">แก้ไขข้อมูล</button>
        <button v-if="isUserLoggedIn" v-on:click="deleteCoffee(coffee)">ลบข้อมูล</button>
      </p>
      <hr>
    </div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import { useAuthenStore } from '../../stores/authen'

export default {
  data () {
    return {
      coffees: []
    }
  },
  computed: {
    isUserLoggedIn () {
      const authenStore = useAuthenStore()
      return authenStore.isUserLoggedIn
    }
  },
  async created () {
    try {
      this.coffees = (await CoffeesService.index()).data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    logout () {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' }) 
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteCoffee (coffee) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?")
      if (result) {
        try {
          await CoffeesService.delete(coffee)
          this.refreshData()
        } catch (err) {
          console.log(err)
          if (err.response && err.response.status === 403) {
            alert("คุณไม่มีสิทธิ์ในการลบข้อมูลนี้ หรือ Session หมดอายุ")
            this.logout()
          }
        }
      }
    },
    async refreshData() {
      this.coffees = (await CoffeesService.index()).data
    }
  }
}
</script>