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
  const data = await req.file()

  await pump(data.file, fs.createWriteStream(data.filename))

  reply.send()
})

fastify.listen({ port: 8000 }, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})