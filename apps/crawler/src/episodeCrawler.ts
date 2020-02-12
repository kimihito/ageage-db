import puppeteer from 'puppeteer'
import { Episode } from './episode'

export class EpisodeCrawler {
  private regxp = /^(\d{4}年\d{1,2}月\d{1,2}日).*?「(.*)」/

  constructor(private page: puppeteer.Page) {}

  async run(): Promise<Episode | null> {
    const heading: (string | null) = await this.page.$eval('#content > h2, h3', heading => heading.textContent)
    const matchedText = heading?.match(this.regxp)
    if (!matchedText) return null
    const episode: Episode = {
      onAirDate: matchedText[1], theme: matchedText[2].replace(/第\d{1}弾| .*部編/,'').trim()
    }
    return episode
  }
}
