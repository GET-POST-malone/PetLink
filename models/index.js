const Pet = require('./Pet');
const Login = require('./Login');

Login.hasMany(Pet, {
  foreignKey: 'login_id',
  onDelete: 'CASCADE',
});

Pet.belongsTo(Login, {
  foreignKey: 'login_id',
});

module.exports = { Pet, Login };
