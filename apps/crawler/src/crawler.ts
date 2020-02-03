import puppeteer from 'puppeteer'

export interface Restaurant {
  name: string,
  address: string,
  tel: string,
  open?: string,
  close?: string,
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

  async run(): Promise<Restaurant[]> {
    this.browser = await puppeteer.launch(this.launchArgs)
    this.page = await this.browser.newPage()
    await this.page.goto(this.url)
    const restaurantElementHandlers = await this.page.$$('.cnt')
    const restaurants: Restaurant[] = []
    for (let restaurantElementHandler of restaurantElementHandlers) {
      const name = await this.getName(restaurantElementHandler)
      const restaurantInfo = await restaurantElementHandler.$eval('.item_02.area', restaurantInfoEl => {
        const childNodes = Array.from(restaurantInfoEl.childNodes).filter(childNode => childNode.hasChildNodes())
        const resultArrays = childNodes.map(node => {
          let results = []
          let hoge = node.nextSibling
          while (hoge) {
            if (hoge.nodeName === "B") break
            results.push(hoge.textContent)
            hoge = hoge.nextSibling
          }
          return results.filter(v => v).join(' ').replace(/\n/g, '').trim()
        })
        return resultArrays
      })
      const restaurant: Restaurant = {
        name: name,
        address: restaurantInfo[0]!,
        tel: restaurantInfo[1]!,
        open: restaurantInfo[2],
        close: restaurantInfo[3]
      }
      restaurants.push(restaurant)
    }
    await this.close();
    console.log(restaurants)
    return restaurants
  }

  public async getName(elementHandle: puppeteer.ElementHandle): Promise<string> {
    const name: string = await elementHandle.$eval('.item_01.area > h3', nameEl => nameEl.textContent!)
    return name
  }
}
