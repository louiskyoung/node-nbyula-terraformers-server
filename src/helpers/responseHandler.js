const jwt = require('jsonwebtoken')

const authResponseHandler = (res, data, status = 200) => {
  const expiresIn = (process.env.EXPIRES_IN || 60) * 60
  const secret = process.env.JWT_SECRET || '$ecrity'

  delete (data, 'password')
  data.token = jwt.sign(data, secret, { expiresIn })
  res.status(status).json(data)
}

module.exports = {
  authResponseHandler,
}
