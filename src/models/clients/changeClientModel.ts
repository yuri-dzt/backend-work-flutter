import connection from '../../configs/database'

export interface ChangeClientProps {
  name?: string
  lastName?: string
  age?: number
}

export default async function ChangeClientModel (clientId: string, newInfos: ChangeClientProps) {
  try {
    if (newInfos.name) {
      connection.query(`
            UPDATE clientes
            SET nome = '${newInfos.name}'
            WHERE id = ${clientId}
            `
      )
    }
    if (newInfos.lastName) {
      connection.query(`
            UPDATE clientes
            SET sobrenome = '${newInfos.lastName}'
            WHERE id = ${clientId}
            `
      )
    }
    if (newInfos.age) {
      connection.query(`
            UPDATE clientes
            SET idade = ${newInfos.age}
            WHERE id = ${clientId}
            `
      )
    }

    return 'Informações alteradas com sucesso'
  } catch (err) {
    throw new Error('Erro ao alterar informações')
  }
}
