import { app } from './app.js'

const start = async () => {
    try {
      await app.listen({ port: 8000 })
      console.log(`server listening on ${app.server.address().port}`)
    } catch (err) {
        app.log.error(err)
      process.exit(1)
    }
  }
  start()