import puppeteer from 'puppeteer'

interface Restaurant {
  name: string
}

export default class Crawler {
  private launchArgs = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  }

  private browser: puppeteer.Browser | null = null
  private page: puppeteer.Page | null = null

  constructor(private url: string) {}

  async close() {
    await this.browser!.close()
    this.browser = null
    this.page = null
  }

  async run(): Promise<(Restaurant)[]> {
    this.browser = await puppeteer.launch(this.launchArgs)
    this.page = await this.browser.newPage()
    await this.page.goto(this.url)
    const title: (Restaurant)[] = await this.page.$$eval('.cnt > .item_01.area > h3', titleLists => {
      return titleLists.filter<Element>((title): title is Required<Element> => { typeof title === element }).map(titleElement => {
        if(titleElement) {
          const restaurant: Restaurant = { name: titleElement.textContent  }
          return restaurant
        }
      })
    })
    await this.close();
    console.log(title)
    return title
  }
}
