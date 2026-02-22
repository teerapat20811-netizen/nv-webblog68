<template>
  <div class="upload-box">
    <div class="mb-3">
      <label class="form-label">Upload Thumbnail:</label>
      <input type="file" class="form-control" @change="onFileChange" accept="image/*" />
    </div>
    
    <div v-if="previewImage" class="preview-container">
      <img :src="previewImage" class="img-thumbnail" />
      <p class="mt-2 text-success" v-if="uploadStatus">{{ uploadStatus }}</p>
    </div>
  </div>
</template>

<script>
import UploadService from '../../services/UploadService' // นำเข้า Service สำหรับยิง API อัปโหลด

export default {
  data () {
    return {
      previewImage: null, // เก็บ URL ชั่วคราวสำหรับแสดงรูปตัวอย่าง
      uploadStatus: ''    // เก็บข้อความแสดงสถานะการอัปโหลด
    }
  },
  methods: {
    async onFileChange (e) {
      // 1. ดึงไฟล์ที่ผู้ใช้เลือก
      const file = e.target.files[0]
      if (!file) return
      
      // 2. สร้าง Preview ทันที (UX improvement) ให้ผู้ใช้เห็นรูปก่อน
      this.previewImage = URL.createObjectURL(file)
      this.uploadStatus = 'Uploading...'
      
      // 3. เตรียมข้อมูลส่งไปให้ Server (ต้องใช้ FormData สำหรับส่งไฟล์)
      const formData = new FormData()
      formData.append('image', file) // 'image' คือ key ที่ Multer ฝั่ง Server รอรับ
      
      try {
        // 4. ยิง Request ไปหา Server
        const response = await UploadService.upload(formData)
        this.uploadStatus = 'Uploaded Successfully!'
        
        // 5. ส่งชื่อไฟล์ใหม่ (ที่ Server ตั้งให้) กลับไปให้ Component แม่ (CreateCoffee / EditCoffee)
        this.$emit('uploaded', response.data.filename)
      } catch (err) {
        console.log(err)
        this.uploadStatus = 'Upload Failed'
      }
    }
  }
}
</script>

<style scoped>
/* ปรับขนาดรูป Preview ไม่ให้ใหญ่เกินไป */
.preview-container img {
  max-width: 300px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
}
</style>