import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
  host: 'localhost',
  port: Number(process.env.DATABASE_PORT ? process.env.DATABASE_PORT : 3306),
  user: process.env.DATABASE_USER ? process.env.DATABASE_USER : 'root',
  password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : 'root',
  database: process.env.DATABASE_DB ? process.env.DATABASE_DB : 'backend_unilavras'
})

export const findAdminByEmail = (email: string, callback: (err: any, results: any) => void) => {
  connection.query('SELECT senha FROM admin WHERE email = ?', [email], callback)
}
