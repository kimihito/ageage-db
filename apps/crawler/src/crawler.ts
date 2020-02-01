import puppeteer from 'puppeteer'

export interface Restaurant {
  name: string,
  address: string
}

export class Crawler {
  private launchArgs = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  }

  private browser!: puppeteer.Browser
  private page!: puppeteer.Page

  constructor(private url: string) { }

  async close() {
    await this.browser.close()
  }

  async run(): Promise<(Restaurant)[]> {
    this.browser = await puppeteer.launch(this.launchArgs)
    this.page = await this.browser.newPage()
    await this.page.goto(this.url)
    const restaurantElementHandlers = await this.page.$$('.cnt')
    const restaurants: Restaurant[] = []
    for (let restaurantElementHandler of restaurantElementHandlers) {
      const name = await restaurantElementHandler.$eval('.item_01.area > h3', nameEl => nameEl.textContent!)
      const address = await restaurantElementHandler.$eval('.item_02.area', restaurantInfo => {
        return Array.from(restaurantInfo.childNodes).filter(childNode => !childNode.hasChildNodes() && !childNode.tagName === "br").map(node => node.textContent!)[1]
      })
      const restaurant: Restaurant = { name: name, address: address }
      restaurants.push(restaurant)
    }
    await this.close();
    console.log(restaurants)
    return restaurants
  }
}
