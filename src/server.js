const express = require('express')
const dotenv = require('dotenv')

const app = express()

dotenv.config()
app.use(express.json())

app.listen(process.env.PORT, () => {
  console.log(`App listening on the port ${process.env.PORT}`)
})
