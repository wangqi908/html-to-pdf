const { getPdf } = require('../utils')
const express = require('express')
const router = express.Router()
router.post('/', async (req, res, next) => {
  try {
    const { styleStr, htmlStr, url, token, margin } = req.body
    const pdfRes = await getPdf({ styleStr, htmlStr, url, token, margin })

    const { status, data } = pdfRes
    if (status === 200) {
      res.set({ 'Content-Type': 'application/pdf', 'Content-Length': data.length })
      res.send(data)
    } else {
      res.send({ status, data })
    }
  } catch (error) {
    res.send({ status: 400, data: error })
  }
})

module.exports = router
