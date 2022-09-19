const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    const secret = process.env.JWT_SECRET || '$ecrity'
    try {
      const verificationResponse = jwt.verify(token, secret)
      const id = verificationResponse.id
      const user = await prisma.user.findFirst({
        where: { id },
      })

      if (user) {
        req.user = user
        return next()
      }
    } catch (error) {
      return res.status(401).json('Unauthenticated user')
    }
  }
  return res.status(401).json('Unauthenticated user')
}

module.exports = {
  authMiddleware,
}
