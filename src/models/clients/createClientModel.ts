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

// import connection from '../../configs/database'
// import { CreateClientFactory } from '../../factories/client'
// import { type ClientProps } from '../../types/clients'

// export async function createClientModel (client: ClientProps) {
//   try {
//     // Verifica se o cliente já existe
//     const clientExists = await new Promise<boolean>((resolve, reject) => {
//       connection.query('SELECT COUNT(*) AS count FROM clientes WHERE email = ?', [client.email], (err, rows) => {
//         if (err) {
//           reject(new Error(`Erro ao verificar se o cliente existe: ${(err as Error).message}`))
//           return
//         }
//         resolve(rows[0].count > 0)
//       })
//     })

//     if (clientExists) {
//       throw new Error(`Cliente já existe com o email: ${client.email}`)
//     }

//     // Validação dos dados do cliente
//     if (!client.name || !client.email || !client.age) {
//       throw new Error('Os campos nome, email e idade são obrigatórios')
//     }

//     // Cria um novo cliente
//     const newClient = new CreateClientFactory().Create(client)

//     // Insere o cliente no banco de dados
//     await new Promise<void>((resolve, reject) => {
//       connection.query(
//         'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
//         [newClient.name, newClient.lastname, newClient.email, newClient.age],
//         (err) => {
//           if (err) {
//             reject(new Error(`Erro ao inserir o cliente no banco de dados: ${(err as Error).message}`))
//             return
//           }
//           resolve()
//         }
//       )
//     })

//     return newClient
//   } catch (error) {
//     throw new Error(`Erro ao criar o cliente: ${error}`) //eslint-disable-line
//   }
// }
