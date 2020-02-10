import puppeteer from 'puppeteer'
import { Episode } from './episode'
import { RestaurantCrawler } from './restaurantCrawler'
import { Restaurant } from './restaurant'

export class EpisodeCrawler {
  private regxp = /^(\d{4}年\d{1,2}月\d{1,2}日).*?「(.*)」/

  constructor(private page: puppeteer.Page, private url: string) {}

  async run(): Promise<Episode | null> {
    await this.page.goto(this.url)
    const heading: (string | null) = await this.page.$eval('#content > h2', heading => heading.textContent)
    const matchedText = heading?.match(this.regxp)
    if (!matchedText) return null
    const restaurants: Restaurant[] = await new RestaurantCrawler(this.page).run()
    const episode: Episode = {
      onAirDate: matchedText[1], theme: matchedText[2].replace(/第\d{1}弾| .*部編/,'').trim(), restaurants: restaurants
    }
    return episode
  }
}
