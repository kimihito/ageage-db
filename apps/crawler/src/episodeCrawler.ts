import puppeteer from 'puppeteer'
import { Episode } from '../src/episode'

export class EpisodeCrawler {
  private episodes: Episode[] = []
  private regxp = /^(\d{4}年\d{1,2}月\d{1,2}日).*?「(.*)」/

  constructor(private page: puppeteer.Page, private url: string) {}

  async run(): Promise<Episode[]> {
    await this.page.goto(this.url)
    const headings: string[] = await this.page.$$eval('h2', headings => headings.map(heading => heading.textContent).filter<string>((h): h is string => typeof h === 'string'))


    this.episodes = headings.map((heading) => {
      const matchedText = heading.match(this.regxp)
      if (!matchedText) return null
      const episode: Episode = {
          link: 'hoge', onAirDate: matchedText[1], category: matchedText[2]
      }
      return episode
    }).filter((episode): episode is Episode => !!episode)

    return this.episodes

  }
}
