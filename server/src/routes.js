const isAuthenController = require('./controllers/isAuthenController')
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const BlogController = require('./controllers/BlogController')
const UploadController = require('./controllers/UploadController')
const CoffeeController = require('./controllers/CoffeeController') 

// --- จุดที่แก้ไข: ลบบรรทัด fileUpload ที่เป็นต้นเหตุของ Error ออก ---
const coffeeUpload = require('./middleware/coffeeUpload') // ใช้ไฟล์ที่มีอยู่จริง

module.exports = (app) => {
  // User Management
  app.get('/users', isAuthenController, UserController.index)
  app.post('/user', UserController.create)
  app.put('/user/:userId', UserController.put)
  app.delete('/user/:userId', UserController.remove)
  app.get('/user/:userId', UserController.show)
  app.post('/login', UserAuthenController.login)
  app.post('/register', UserAuthenController.register)

  // Blog Management
  app.post('/blog', BlogController.create)
  app.put('/blog/:blogId', BlogController.put)
  app.delete('/blog/:blogId', BlogController.remove)
  app.get('/blog/:blogId', BlogController.show)
  app.get('/blogs', BlogController.index)

  // Upload Management (Lab 12)
  // ใช้ coffeeUpload สำหรับทั้งการอัปโหลดทั่วไปและรูปกาแฟเพื่อให้ทำงานได้
  app.post('/upload', coffeeUpload, UploadController.upload)
  app.post('/coffee-upload', coffeeUpload, UploadController.upload) 

  // Coffee Management (ร้านกาแฟ)
  app.get('/coffees', CoffeeController.index)
  app.get('/coffee/:coffeeId', CoffeeController.show)

  app.post('/coffee', isAuthenController, CoffeeController.post)
  app.put('/coffee/:coffeeId', isAuthenController, CoffeeController.put)
  app.delete('/coffee/:coffeeId', isAuthenController, CoffeeController.delete)
}