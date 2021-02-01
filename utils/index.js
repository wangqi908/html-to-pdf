const puppeteer = require('puppeteer')

module.exports = {
  async getPdf({ styleStr, htmlStr, url, token, margin }) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    margin = margin || {
      top: '20px',
      bottom: '20px',
      right: '20px',
      left: '20px'
    }
    // 配置token
    if (token) {
      page.setExtraHTTPHeaders({
        Authorization: 'token'
      })
    }

    if (url) {
      if (url === '') {
        return { status: 400, data: 'url不可为空' }
      }
      await page.goto(url, { waitUntil: 'networkidle2' })
    } else {
      if (!htmlStr) {
        return { status: 400, data: 'htmlStr不可为空' }
      }
      if (!styleStr) {
        return { status: 400, data: 'styleStr不可为空' }
      }
      await page.setContent(htmlStr)
      await page.addStyleTag({ content: styleStr })
    }

    await page.goto(url, { waitUntil: 'networkidle0' })
    const pdfOpt = {
      format: 'A4',
      printBackground: true,
      '-webkit-print-color-adjust': 'exact',
      margin
    }
    const pdf = await page.pdf(pdfOpt)
    await browser.close()

    return { status: 200, data: pdf }
  }
}
