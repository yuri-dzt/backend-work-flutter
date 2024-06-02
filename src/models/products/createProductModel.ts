import connection from '../../configs/database'

export interface ProductProps {
  id?: number
  name: string
  description?: string
  price: number
  updateDate?: string
}

export default async function CreateProductModel (product: ProductProps) {
  const data = new Date().toISOString().slice(0, 19).replace('T', ' ')

  const query = `
    INSERT INTO produtos (nome, descricao, preco, data_atualizado)
    VALUES (?, ?, ?, ?)
  `

  const values = [product.name, product.description ?? null, product.price, data]

  return await new Promise((resolve, reject) => {
    connection.query(query, values, (err) => {
      if (err) {
        reject(new Error(`Erro ao registrar o produto. Erro: ${(err as Error).message}`)); return
      }
      resolve('Produto criado com sucesso')
    })
  })
}
