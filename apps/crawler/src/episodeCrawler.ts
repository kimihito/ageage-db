import puppeteer from 'puppeteer'
import { Episode } from '../src/episode'

export class EpisodeCrawler {
  constructor(private page: puppeteer.Page, private url: string) {}

  async run(): Promise<string[]> {
    await this.page.goto(this.url)
    const episodeTitles = await this.page.$$eval('h2', (episodeTitle) => {
      return episodeTitle.map((title) => {
        return title.innerHTML
      }).filter(html => html.match(/^\d{4}/))
    })
    return episodeTitles
  }
}
