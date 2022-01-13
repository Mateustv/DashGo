import { createServer, Model } from 'miragejs'

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

    routes() {

      this.namespace = 'api' // toda rota api/...
      this.timing = 750 // toda requicisão vai durar 750ms 

      this.get('/users');
      this.post('/users')

      this.namespace = '' // tiro o api da rota para não atrapalhar as rotas o next
    }
  })

  return server
}