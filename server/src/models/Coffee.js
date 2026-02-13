module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('Coffee', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.STRING // <--- ต้องเพิ่มบรรทัดนี้ด้วยนะครับ
  })
  return Coffee
}