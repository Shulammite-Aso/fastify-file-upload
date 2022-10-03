import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'

const pump = util.promisify(pipeline)


export const app = Fastify({
    logger: true
  })

  app.register(multipart)

  app.post('/upload', async function (req, reply) {

const parts = req.parts()

for await (const part of parts) {

  if (part.file) {

    // upload and save the file
    await pump(part.file, fs.createWriteStream(`./uploads/${part.filename}`))

  } else {
    // do something with the non-files parts
  }
  
}

    return {messege : 'files uploaded' }
})
