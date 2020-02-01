import Crawler from './crawler'
import * as puppeteer from 'puppeteer'
import * as path from 'path'
import { pathToFileURL  } from 'url'

const main = async () => {
  console.log('running main...')
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/detail.htm')}`).toString()
  const crawler = new Crawler(url)
  const titles = await crawler.run()
  return titles
}

main()
