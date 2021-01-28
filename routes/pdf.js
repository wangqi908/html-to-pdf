const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer')

router.get('/', async (req, res, next) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  // 配置token
  page.setExtraHTTPHeaders({
    Authorization: 'token'
  })
  /*
  https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v5.5.0&show=api-class-page
  waitUntil参数是来确定满足什么条件才认为页面跳转完成。包括以下事件：
  load - 页面的load事件触发时
  domcontentloaded - 页面的DOMContentLoaded事件触发时
  networkidle0 - 不再有网络连接时触发（至少500毫秒后）
  networkidle2 - 只有2个网络连接时触发（至少500毫秒后）
  */
  await page.goto('https://www.baidu.com/', { waitUntil: 'networkidle2' })
  await page.pdf({
    path: 'hn.pdf',
    format: 'A4',
    printBackground: true,
    '-webkit-print-color-adjust': 'exact',
    margin: {
      top: '20px',
      bottom: '20px',
      right: '20px',
      left: '20px'
    }
  })

  await browser.close()

  res.send({ status: 200, data: 'pdf!!' })
})

module.exports = router
