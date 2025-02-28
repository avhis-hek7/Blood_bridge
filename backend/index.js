const connectToMongo=require("./database");
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})