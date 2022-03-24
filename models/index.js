const Login = require('./Login');
const Pet = require('./Pet');

Login.hasMany(Pet, {
  foreignKey: 'login_id',
  onDelete: 'CASCADE',
});

Pet.belongsTo(Login, {
  foreignKey: 'login_id',
});

module.exports = { Login, Pet };
