import Fastify from 'fastify'
import cors from '@fastify/cors'
import { app } from './app/app.js'
import 'dotenv/config'
import mercuriusUpload from 'mercurius-upload'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

// Instantiate Fastify with some config
const server = Fastify({
  logger: true
})

server.register(mercuriusUpload, {
  // Registra mercurius-upload
  maxFileSize: 10000000, // 10 MB
  maxFiles: 5
})

server.register(cors, {
  origin: '*', // Reflect the request origin
  credentials: true, // Allow cookies and headers
  methods: ['GET', 'POST']
})

// Register your application as a normal plugin.
server.register(app)
// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  } else {
    console.log(`[ ready ] http://${host}:${port}`)
  }
})
