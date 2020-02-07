import puppeteer from 'puppeteer'

export class episodeCrawler {
  constructor(private page: puppeteer.Page, private url: string = 'hoge') {}

  async run(): Promise<string[]> {
    await this.page.goto(this.url)
  }
}