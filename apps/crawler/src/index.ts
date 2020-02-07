import { Crawler } from './crawler'
import { episodeCrawler } from './episodeCrawler'
import { Restaurant } from './restaurant'
import * as path from 'path'
import puppeteer from 'puppeteer'
import { pathToFileURL  } from 'url'

type RestaurantCollection =  Restaurant[]

const launchArgs: puppeteer.ChromeArgOptions = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
}

const main = async () => {
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/detail.htm')}`).toString()
  console.log('running main...')
  try {
    const browser = await puppeteer.launch(launchArgs)
    const page = await browser.newPage()
    const links = await new episodeCrawler(page).run()

    const restaurants: RestaurantCollection = []
    for (let link of links) {
      const crawler = new RestaurantsCrawler(page, link)
      restaurants.push(await crawler.run())
    }

    // 同じテーマの放送で紹介されたカテゴリは同じものとしてグルーピングする

  } catch {

  }
}

main()
