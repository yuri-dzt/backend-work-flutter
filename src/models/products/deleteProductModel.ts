import connection from '../../configs/database'

export default async function DeleteProductModel (productId: string) {
  try {
    connection.query(`
        DELETE FROM produtos
        WHERE id = ${productId}
        `)

    return 'Procuto deletado com sucesso'
  } catch (err) {
    throw new Error('Falha ao deletar o produto')
  }
}
