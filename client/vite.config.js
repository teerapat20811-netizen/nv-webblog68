import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // --- เพิ่มส่วนนี้เข้าไปครับ ---
  server: {
    port: 3000
  },
  // --------------------------
  define: {
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
    __DEFINES__: JSON.stringify({})
  }
})