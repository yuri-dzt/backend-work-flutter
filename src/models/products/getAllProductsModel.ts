import connection from '../../configs/database'
import { type ProductProps } from './createProductModel'

export interface DBProductRow {
  id: number
  nome: string
  descricao: string | null
  preco: number
  data_atualizado: string
}

export default async function GetAllProductsModel (): Promise<ProductProps[] | null> {
  try {
    const products: ProductProps[] | null = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM produtos', (err: any, rows: DBProductRow[]) => {
        if (err) {
          reject(err)
          return
        }

        if (rows.length === 0) {
          resolve(null)
          return
        }

        const products = rows.map((row) => ({
          id: row.id,
          name: row.nome,
          description: row.descricao,
          price: row.preco,
          updateDate: row.data_atualizado
        })) as ProductProps[]

        resolve(products)
      })
    })

    return products
  } catch (err) {
    console.error(`Erro ao buscar os produtos. Erro: ${(err as Error).message}`)
    throw err
  }
}
