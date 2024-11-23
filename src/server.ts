import express, { type Request, type Response } from 'express'
import clientRouters from './routers/clients'
import productRouters from './routers/products'
import adminRouters from './routers/admin'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors' // Importe o cors

const app = express()

dotenv.config()

app.use(cors())

app.use(express.json())
app.use('/api', clientRouters)
app.use('/api', adminRouters)
app.use('/api', productRouters)

app.use(express.static(path.join(__dirname, 'viwer')))
app.get('/', (req: Request, res: Response) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, 'viwer', 'index.html'))
})
app.get('/client', (req: Request, res: Response) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, 'viwer', 'client.html'))
})
app.get('/products', (req: Request, res: Response) => {
  res.set('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, 'viwer', 'products.html'))
})

const port = process.env.DEV_PORT ? Number(process.env.DEV_PORT) : 3000

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})

export { app, port }
