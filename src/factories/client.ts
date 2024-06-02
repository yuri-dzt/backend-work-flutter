import { v4 as uuidv4 } from 'uuid'
import { type ClientProps } from '../types/clients'
class Client {
  id: string
  name: string
  lastname: string
  email: string
  age: number
  constructor (id: string, client: ClientProps) {
    this.id = id
    this.name = client.name
    this.lastname = client.lastname
    this.email = client.email
    this.age = client.age
  }
}

export class CreateClientFactory {
  Create (client: ClientProps): Client {
    const id = `${uuidv4()}`
    return new Client(id, client)
  }
}
