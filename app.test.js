'use strict'

import { test } from 'tap'
import formAutoContent from 'form-auto-content'
import fs from 'fs'
import { app } from './app.js'

const myForm  = formAutoContent({
    fullName: 'Amarachi Aso',
    article: fs.createReadStream(`./sample_files/file.txt`),
    coverImage: fs.createReadStream(`./sample_files/cover.jpg`)
  })

test('submits form with multiple files in it', async t => {

    const res = await app.inject({
        method: 'post',
        url: '/upload',
        ...myForm
      })
  t.equal(res.statusCode, 200, 'returns a status code of 200')
})
