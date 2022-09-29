import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'

const pump = util.promisify(pipeline)


const fastify = Fastify({
    logger: true
  })

fastify.register(multipart)

fastify.post('/', async function (req, reply) {

const parts = req.files()
for await (const part of parts) {
  if (part.file) {
    // upload and save the file
    await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`))
    console.log(part)
  } else {
    // do something with the non-files parts
    console.log(part)
  }
}

    return {messege : 'files uploaded' }
  //reply.send()
})

const start = async () => {
    try {
      await fastify.listen({ port: 8000 })
      console.log(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()
