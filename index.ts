import app from './api'
const port: number = Number(process.env.PORT) || 5000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
