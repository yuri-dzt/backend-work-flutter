import connection from '../../configs/database'
import { type ClientProps } from '../../types/clients'

export const getAllClientsModel = async (): Promise<ClientProps[] | null> => {
  try {
    const clients: ClientProps[] | null = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM clientes', (err, rows) => {
        if (err) {
          reject(new Error('Erro ao pegar clientes')); return
        }

        if (rows.length === 0) {
          reject(new Error('Nenhum cliente encontrado')); return
        }

        const clients: ClientProps[] = rows.map((row: any) => ({
          id: row.id,
          name: row.nome,
          lastname: row.sobrenome,
          email: row.email,
          age: row.idade,
          photo: row.foto
        }))

        resolve(clients)
      })
    })

    return clients
  } catch (err) {
    console.error((err as Error).message)
    throw err
  }
}
