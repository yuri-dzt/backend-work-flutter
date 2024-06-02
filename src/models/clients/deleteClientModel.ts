import connection from '../../configs/database'

export default async function DeleteClientModel (clientId: string) {
  try {
    connection.query(`DELETE FROM clientes WHERE id = ${clientId}`)
    return 'Cliente deletedo com sucesso'
  } catch (err) {
    throw new Error('Algo deu errado ao deletar o cliente')
  }
}
