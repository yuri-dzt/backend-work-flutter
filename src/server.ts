import express, { type Request, type Response } from 'express'
import clientRouters from './routers/clients'
import productRouters from './routers/products'
import adminRouters from './routers/admin'
import path from 'path'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

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
  // console.log(`api running on port ${port}`)
})

export { app, port }

/**
 * install npm
 * install typescript
 * install @types/node
 * install tsx: tsc --init
 * run typescript
 * configurate tscofig
 * install express
 * create a server file and set express
 * set a dev script in package,json with: tsx watch ./src/server.ts <== your path
 * create a viwer diretory with html files
 * set a get router in server.ts and set its res's content type to text/html
 * set a res.sendFile with the path of your html file
 *
 */
