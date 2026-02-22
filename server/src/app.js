const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// --- จุดที่แก้ไข: เปลี่ยนจาก '/assets' เป็น '/public' เพื่อให้ตรงกับ Path ใน Index.vue ---
// สิ่งนี้จะทำให้เราเข้าถึงรูปภาพผ่าน http://localhost:8081/public/uploads/ชื่อไฟล์ ได้ครับ
app.use('/public', express.static('public')) 
// ----------------------------------------------------------------------------

require('./userPassport')
// --- Routes Section ---
require('./routes')(app)

// --- Server Startup Section ---
const port = config.port

sequelize.sync({ force: false })
    .then(() => {
        app.listen(config.port, '0.0.0.0', () => {
            console.log('Server running on port ' + port)
        })
    })