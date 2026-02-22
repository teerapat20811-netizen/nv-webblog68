module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('Coffee', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING // <--- เพิ่มบรรทัดนี้
  })
  return Coffee
}