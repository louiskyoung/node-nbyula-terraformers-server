const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const router = require('./router')

const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())
app.use('/api', router)

app.listen(process.env.PORT, () => {
  console.log(`App listening on the port ${process.env.PORT}`)
})
