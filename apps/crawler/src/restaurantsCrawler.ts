import puppeteer from 'puppeteer'
import { Restaurant } from './restaurant'

export class RestaurantsCrawler {

  constructor(private page: puppeteer.Page) { }

  async run(): Promise<Restaurant[]> {
    const restaurantElementHandlers = await this.page.$$('.cnt')
    const restaurants: Restaurant[] = []
    for (let restaurantElementHandler of restaurantElementHandlers) {
      const name = await this.getName(restaurantElementHandler)
      // if restaurant name does not exist, skip
      if (!name || name === '') continue

      const restaurantInfo = await restaurantElementHandler.$eval('.item_02.area', restaurantInfoEl => {
        const childNodes = Array.from(restaurantInfoEl.childNodes).filter(childNode => childNode.hasChildNodes())
        const resultArrays = childNodes.map(node => {
          let results = []
          let nextChildNode = node.nextSibling
          while (nextChildNode) {
            if (nextChildNode.nodeName === "B") break
            results.push(nextChildNode.textContent?.trim())
            nextChildNode = nextChildNode.nextSibling
          }
          return results.filter(v => v).join(', ').replace(/\n/g, '')
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
    return restaurants
  }

  public async getName(elementHandle: puppeteer.ElementHandle): Promise<string | null> {
    const name = await elementHandle.$eval('.item_01.area', nameEl => nameEl.textContent)
    if (name) return name.replace(/\n/g,'').trim()
    return name
  }
}
