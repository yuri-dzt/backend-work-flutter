import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import { findAdminByEmail } from '../../models/admin/findAdminByEmail'

interface Body {
  email: string
  password: string
}

interface Admin {
  senha: string
}

export const login = async (req: Request<Body>, res: Response) => {
  const { email, password } = req.body

  // Verificar se o email e a senha são strings
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'O email e a senha devem ser strings.' })
  }

  findAdminByEmail(email, async (err: any, results: Admin[]) => {
    if (err) {
      console.error('Erro ao buscar admin:', err)
      return res.status(500).json({ success: false, message: 'Erro no servidor.' })
    }

    if (results.length > 0) {
      const hashedPassword = results[0].senha
      const match = await bcrypt.compare(password, hashedPassword)

      if (match) {
        return res.status(200).json({ success: true, message: 'Login bem-sucedido!' })
      } else {
        return res.status(401).json({ success: false, message: 'Senha incorreta.' })
      }
    } else {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' })
    }
  })
}
