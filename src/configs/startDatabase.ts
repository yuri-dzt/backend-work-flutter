import { connect, initializeDatabase } from './database'

async function startApp () {
  await connect()
  await initializeDatabase()
}

startApp()
