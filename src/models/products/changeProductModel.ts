import connection from '../../configs/database'

interface ProductsInfoProps {
  name?: string
  description?: string
  price?: number
}

export default async function ChangeProductModel (productId: string, productInfos: ProductsInfoProps) {
  try {
    if (productInfos.name) {
      connection.query(`
            UPDATE produtos
            SET nome = '${productInfos.name}'
            WHERE id = ${productId}
            `
      )
    }
    if (productInfos.description) {
      connection.query(`
            UPDATE produtos
            SET descricao = '${productInfos.description}'
            WHERE id = ${productId}
            `
      )
    }
    if (productInfos.price) {
      connection.query(`
            UPDATE produtos
            SET preco = '${productInfos.price}'
            WHERE id = ${productId}
            `
      )
    }

    const data = new Date().toISOString().slice(0, 19).replace('T', ' ')
    connection.query(`
            UPDATE produtos
            SET data_atualizado = '${data}'
            WHERE id = ${productId}
            `)

    return 'Produto atualizado com sucesso'
  } catch (err) {
    throw new Error('Erro ao modificar o produto')
  }
}
