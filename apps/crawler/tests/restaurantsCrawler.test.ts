import { RestaurantsCrawler } from '../src/restaurantsCrawler'
import { Restaurant } from '../src/restaurant'
import * as path from 'path'
import { pathToFileURL  } from 'url'
import puppeteer from 'puppeteer'

const launchArgs: puppeteer.ChromeArgOptions = {
  args: [
    '--disable-setuid-sandbox',
    '--no-sandbox',
  ]
}


test('crawler gets restaurants', async () => {
  const expected = [
    {
      name: '肉汁あふれる手作りハンバーグ ばくばく亭',
      address: '中頭郡北谷町吉原315-1',
      tel: '098-926-6888',
      open: 'ランチ11：30～15：00, ディナー17：00～20：00（L.O.）, ※売り切れ次第終了',
      close: '月曜'
    },
    {
      name: '鳥と卵の専門店 鳥玉 泉崎店',
      address: '那覇市泉崎1-17-1',
      tel: '098-963-9571',
      open: '11：00～21：00',
      close: 'なし'
    },
    {
      name: 'トマト＆オニオン 那覇安岡店',
      address: '那覇市銘苅3-22-25',
      tel: '098-860-1003',
      open: '11：00～25：00',
      close: 'なし'
    }
  ]
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/detail.htm')}`).toString()
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  await page.goto(url)
  const results: Restaurant[] = await new RestaurantsCrawler(page).run()
  expect(results).toEqual(expect.arrayContaining(expected))
})

test('crawler skips no restaurtant info', async () => {
  const expected = [
    {
      name: '中華厨房 齊華房（さいかぼう）',
      address: '那覇市首里汀良町3-101-1',
      tel: '098-943-5466',
      open: 'ランチ11：30〜14：30（L.O.13：45）, ディナー17：30〜22：30（L.O.22：00）',
      close: '水曜'
    },
    {
      name: '味心 ゆうづき 本店',
      address: '浦添市内間4丁目17番地1号',
      tel: '098-879-5570',
      open: 'ランチタイム11：30〜14：00, 夜の部17：00〜2：00',
      close: 'ランチは日曜・祝日/夜の部は月曜'
    },
    {
      name: '中国料理 孔雀樓（くじゃくろう）',
      address: '宜野湾市大山2-22-8',
      tel: '098-897-3548',
      open: 'ランチ11：30〜14：15（L.O.）, ディナー17：30〜21：45（L.O.）',
      close: '水曜'
    }
  ]
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/detail_unused_cnt.htm')}`).toString()
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  await page.goto(url)
  const results: Restaurant[] = await new RestaurantsCrawler(page).run()
  expect(results).toEqual(expect.arrayContaining(expected))

})