import connection from '../../configs/database'
import { CreateClientFactory } from '../../factories/client'
import { type ClientProps } from '../../types/clients'

export async function createClientModel (client: ClientProps) {
  const clientAlreadyExists: string = await new Promise((resolve, reject) => {
    connection.query(`SELECT nome FROM clientes WHERE email = "${client.email}"`, (err, rows) => {
      if (err) {
        reject(new Error(`Algo deu errado ao criar o cliente ${(err as Error).message}`))
        return
      }

      const foundClient: string = rows.length > 0 && rows[0].nome
       resolve(foundClient) //eslint-disable-line
    })
  })

  if (clientAlreadyExists) throw new Error(`cliente já existe: ${clientAlreadyExists}`)

  if (!client.name || !client.email || !client.age) {
    throw new Error('Os campos nome, email e idade são obrigatórios')
  }

  const newClient = new CreateClientFactory().Create(client)

  connection.query(`
        INSERT INTO clientes (nome, sobrenome, email, idade)
            VALUES (?, ?, ?, ?)
        `, [newClient.name, newClient.lastname, newClient.email, newClient.age])

  return newClient
}
