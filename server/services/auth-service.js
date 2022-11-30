const bcrypt = require('bcrypt')
const uuid = require('uuid').v4

const db = require('../db')
const ApiError = require('../exceptions/api-error')
const UserDto = require('../dto/user-dto')

class AuthService {
  async signup(email, password) {
    if (db.find((user) => user.email === email))
      throw ApiError.BadRequest('Пользователь с таким email уже существует.')

    const hashPassword = await bcrypt.hash(password, 8)

    const user = {
      id: uuid(),
      email,
      password: hashPassword,
      todos: [],
    }
    db.push(user)

    const userDto = new UserDto(user)
    return userDto
  }

  async signin(email, password) {
    const user = db.find((user) => user.email === email)

    if (!user) throw ApiError.BadRequest('Неправильный email или пароль.')

    const isEqualPasswords = await bcrypt.compare(password, user.password)

    if (!isEqualPasswords)
      throw ApiError.BadRequest('Неправильный email или пароль.')

    const userDto = new UserDto(user)

    return userDto
  }
}

module.exports = new AuthService()
