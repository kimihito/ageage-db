import puppeteer from 'puppeteer'
import { Restaurant } from './restaurant'

export class RestaurantsCrawler {

  constructor(private page: puppeteer.Page) { }

  async run(): Promise<Restaurant[]> {
    return await this.page.$$eval('.cnt', (elems) => {
      const restaurantContentTexts =  Array.from(elems).map(elem => (elem as HTMLElement).innerText)
      const castNameRegexp = RegExp('(ジョニー|ゆり)さん', 'g')
      const mappings: { [key: string]: string } = {
        'address': '住所',
        'tel': 'TEL',
        'open': '営業時間',
        'close': '定休日',
        'cast': '出演者',
        'displayMenus': '紹介メニュー'
      }
      const restaurants: Restaurant[] = []
      for (let contentText of restaurantContentTexts) {
        if (!contentText) continue
        // 改行と不要な文字を取り除く
        const restaurantTexts = contentText.split(/\n/).filter(v => !!v).filter(v => !castNameRegexp.test(v))
        const name = restaurantTexts.shift()!
        // 最初の文字列が見出しの場合は店紹介ではないのでスキップ
        if (Object.values(mappings).includes(name)) continue

        // 無視するもの
        if (name === '麸久寿') continue

        const obj: { [key: string]: string } = {}
        for (const key of Object.keys(mappings)) {
          const keyIndex = restaurantTexts.indexOf(mappings[key])!
          // 店舗情報が存在しない場合はスキップ
          if (keyIndex === -1) continue
          // objにないで項目としてあるやつ
          const mapIndex = Object.keys(mappings).findIndex(k => k !== key && !(k in obj) && restaurantTexts.includes(mappings[k]))

          const nextKey = mappings[Object.keys(mappings)[mapIndex]]
          const nextKeyIndex = restaurantTexts.indexOf(nextKey)
          console.log(`mapIndex: ${mapIndex}, nextKey: ${nextKey}, nextKeyIndex: ${nextKeyIndex}`)

          if (nextKeyIndex === -1) {
            // 次の店舗情報がない場合は以降のすべてを一つにつなげる
            obj[key] = restaurantTexts.slice(keyIndex+1)!.join(', ')
          } else {
            obj[key] = restaurantTexts.slice(keyIndex+1, nextKeyIndex)!.join(', ')
          }
        }

        // 店舗情報が一つしかないものは削除
        if (Object.keys(obj).length == 1) continue

        const restaurant: Restaurant = {
          name: name,
          address: obj.address,
          tel: obj.tel,
          open: obj.open,
          close: obj.close
        }

        restaurants.push(restaurant)
      }

      return restaurants
    })
  }
}
