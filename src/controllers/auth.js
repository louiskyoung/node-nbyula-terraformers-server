const Prisma = require('@prisma/client')
const validator = require('validator')
const bcrypt = require('bcrypt')

const { authResponseHandler } = require('../helpers/responseHandler')

const { PrismaClient } = Prisma

const prisma = new PrismaClient()

const register = async ({ body: { name, email, password } }, res) => {
  if (!validator.isEmail(email) || !validator.normalizeEmail(email)) {
    return res.status(400).json('Invalid email was provided.')
  }
  const user = await prisma.user.findFirst({ where: { email } })

  if (user) {
    return res.status(400).json('This email already exists.')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
      email,
    },
  })
  authResponseHandler(res, newUser, 201)
}

const login = async ({ body: { email, password } }, res) => {
  if (!validator.isEmail(email) || !validator.normalizeEmail(email)) {
    return res.status(401).json('Wrong credentials provided.')
  }
  const user = await prisma.user.findFirst({ where: { email } })

  if (user) {
    const isPasswordMatching = await bcrypt.compare(password, user.password)

    if (isPasswordMatching) {
      return authResponseHandler(res, user)
    }
  }
  return res.status(401).json('Wrong credentials provided.')
}

module.exports = {
  register,
  login,
}
