import { createServer, Factory, Model, Response } from 'miragejs'

type User = {  // modelo do meu bd
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({  // criando meu servidor
    models: {
      user: Model.extend<Partial<User>>({}) // modelo do meu banco de dados
    },
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },
        email(i: number) {
          return `mateus${i}${i + 1}@gmail.com`
        },
        createdAt() {
          return '2021-04-02T20:55:10.178Z'
        },
      })
    },

    seeds(server) {
      server.createList('user', 45)
    },

    routes() {

      this.namespace = 'api' // toda rota api/...
      this.timing = 750 // toda requicisão vai durar 750ms 

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = ((Number(page) - 1) * Number(per_page))
        const pageEnd = pageStart + Number(per_page)

        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd)

        return new Response(200, {
          "x-total-count": String(total),
        }, { users })
      });
      this.post('/users')

      this.namespace = '' // tiro o api da rota para não atrapalhar as rotas o next
      this.passthrough() // todas as rotas que não tiverem aqui passem direto 
    }
  })

  return server
}