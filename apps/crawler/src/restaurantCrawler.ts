import puppeteer from 'puppeteer'
import { Restaurant } from './restaurant'

export class RestaurantCrawler {

  constructor(private page: puppeteer.Page) { }

  async run(): Promise<Restaurant[]> {
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
          return results.filter(v => v).join(',').replace(/\n/g, '').trim()
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
    console.log(restaurants)
    return restaurants
  }

  public async getName(elementHandle: puppeteer.ElementHandle): Promise<string> {
    const name: string = await elementHandle.$eval('.item_01.area > h3', nameEl => nameEl.textContent!)
    return name
  }
}
