const jwt = require('jsonwebtoken')

const trimJSON = (json, propsToRemove) => {
  propsToRemove.forEach((propName) => {
    delete json[propName]
  })
}

const authResponseHandler = (res, data, status = 200) => {
  const expiresIn = (process.env.EXPIRES_IN || 60) * 60
  const secret = process.env.JWT_SECRET || '$ecrity'

  trimJSON(data, ['password'])
  data.token = jwt.sign({ id: data.id }, secret, { expiresIn })
  res.status(status).json(data)
}

const userResponseHandler = (res, data, status = 200) => {
  trimJSON(data, ['password'])
  res.status(status).json(data)
}

module.exports = {
  authResponseHandler,
  userResponseHandler,
}
