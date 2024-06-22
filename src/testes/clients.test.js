const request = require('supertest') //eslint-disable-line
const { app } = require('../server') //eslint-disable-line

//* ================================= CLIENTS ==================================

describe('POST /api/clients', () => {
  it('deve permitir campos nome e sobrenome válidos (entre 3 e 255 caracteres), email válido e idade positiva e menor que 120', async () => {
    const validClient = {
      nome: 'Joana',
      sobrenome: 'Silva',
      email: 'joana.silva@example.com',
      idade: 30,
      foto: 'https://example.com/joabe.jpg'
    }

    // Verificar se o nome tem entre 3 e 255 caracteres
    expect(validClient.nome.length).toBeGreaterThanOrEqual(3)
    expect(validClient.nome.length).toBeLessThanOrEqual(255)

    // Verificar se o sobrenome tem entre 3 e 255 caracteres
    expect(validClient.sobrenome.length).toBeGreaterThanOrEqual(3)
    expect(validClient.sobrenome.length).toBeLessThanOrEqual(255)

    // Verificar se o email é válido
    expect(isValidEmail(validClient.email)).toBe(true)

    // Verificar se a idade é positiva e menor que 120
    expect(validClient.idade).toBeGreaterThan(0)
    expect(validClient.idade).toBeLessThan(120)

    const response = await request(app)
      .post('/api/clients')
      .send(validClient)

    // Checar se chamada a endpoint usuarios funciona
    expect(response.status).toBe(201)
  })
})

function isValidEmail (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(`${email}`)
}

//* ================================= PRODUCTS =================================

describe('POST /api/poducts', () => {
  it('deve permitir adicionar um produto com nome, descrição, preço positivo e data válida', async () => {
    const validProduct = {
      name: 'Produto',
      description: 'Descrição do Produto',
      price: 49.99,
      data_atualizado: new Date('2024-06-20T00:00:00Z')
    }

    expect(validProduct.price > 0).toBe(true)

    const currentDate = new Date(validProduct.data_atualizado)
    const startDate = new Date('2000-01-01')
    const endDate = new Date('2024-06-20')
    expect(currentDate >= startDate && currentDate <= endDate).toBe(true)

    const response = await request(app)
      .post('/api/poducts')
      .send(validProduct)

    expect(response.status).toBe(200)
  })
})
