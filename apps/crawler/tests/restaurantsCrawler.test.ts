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
  await browser.close()
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
  await browser.close()
  expect(results).toEqual(expect.arrayContaining(expected))

})

test("address, tel only", async () => {
  const expected = [
    {
      name: 'ステーキハウス 四季 浦添店',
      address: '浦添市伊祖2-4-5',
      tel: '098-877-0429',
    },
    {
      name: "HAN'S 南城大里店",
      address: '南城市大里字仲間735',
      tel: '098-944-2983',
    },
    {
      name: "栄町ステーキ",
      address: '那覇市安里388-5',
      tel: '080-1736-6510',
    },
  ]
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/address_tel_only_detail.htm')}`).toString()
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  await page.goto(url)
  const results: Restaurant[] = await new RestaurantsCrawler(page).run()
  await browser.close()
  expect(results).toEqual(expect.arrayContaining(expected))

})

test("no .item_02.area", async () => {
  const expected = [
    {
      name: '創作山羊料理 山原食いなぁ',
      address: '那覇市西3-13-1',
      tel: '098-943-0509',
      open: '12：00～24：00',
      close: '月曜'
    },
    {
      name: "ビストロ ルボングー",
      address: '那覇市安里379-15',
      tel: '098-963-9088',
      open: '18：00～24：00（L.O.23：00）',
      close: '火曜'
    },
    {
      name: "山羊料理 美咲",
      address: '那覇市安里388-6',
      tel: '098-884-6266',
      open: '18：00～25：00',
      close: '日曜'
    },
  ]
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/no_item_02_area_detail.htm')}`).toString()
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  await page.goto(url)
  const results: Restaurant[] = await new RestaurantsCrawler(page).run()
  await browser.close()
  expect(results).toEqual(expect.arrayContaining(expected))

})

test('unagi', async () => {
  const expected = [
    {
      "name": "鰻屋 兆（きざし）",
      "address": "那覇市仲井真1番地 コーポ喜楽 1F",
      "tel": "098-834-0588",
      "open": "ランチ 11：00～15：00（L.O.14：30）, ディナー17：00～22：00（L.O.21：30）",
      "close": "水曜"
    },
    {
      "name": "うなカフェ",
      "address": "浦添市港川1-32-6 2F",
      "tel": "098-943-2919",
      "open": "ランチ11：30～15：30, ディナー（5～10月限定）17：30～20：00（L.O.19：45）",
      "close": "火曜"
    },
    {
      "name": "うなぎ大和田",
      "address": "沖縄市松本3-8-2",
      "tel": "098-937-4048",
      "open": "11：00～21：30（L.O.）",
      "close": "第2・4木曜"
    }
  ]
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/unagi.htm')}`).toString()
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  await page.goto(url)
  const results: Restaurant[] = await new RestaurantsCrawler(page).run()
  await browser.close()
  expect(results).toEqual(expect.arrayContaining(expected))

})

test('fu-champloo', async () => {
  const expected = [
    {
      "name": "いけだ食堂",
      "address": "島尻郡与那原町東浜95-4",
      "tel": "098-944-0999",
      "open": "11：00～21：00（L.O.）",
      "close": "火曜"
    },
    {
      "name": "高良食堂",
      "address": "那覇市若狭1-7-10",
      "tel": "098-868-6532",
      "open": "10：30～20：30（L.O.）, 木曜 10：30～15：00",
      "close": "不定休"
    },
  ]
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/fu-champloo.htm')}`).toString()
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  await page.goto(url)
  const results: Restaurant[] = await new RestaurantsCrawler(page).run()
  await browser.close()
  expect(results).toEqual(expect.arrayContaining(expected))
})

test('kaisendon', async () => {
  const expected = [
    {
      "name": "まぐろ食堂",
      "address": "那覇市前島3丁目25-1 とまりん2階",
      "tel": "098-863-5475",
      "open": "11：00～15：00, 17：00～21：00（日曜は11：00～18：00）",
      "close": "水曜"
    },
    {
      "name": "IZAKAYA Shinka",
      "address": "那覇市牧志3-19-20 フレンズビル1-B",
      "tel": "098-943-9337",
      "open": "ランチ11：45～16：00, ディナー17：00～24：00",
      "close": "不定休"
    },
    {
      "name": "生け簀の銀次 豊見城店",
      "address": "豊見城市田頭155-1",
      "tel": "98-856-8246",
      "open": "ランチ11：30～15：00, 居酒屋タイム18：00～翌0：00",
      "close": "年中無休"
    },
  ]
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/kaisendon.htm')}`).toString()
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  await page.goto(url)
  const results: Restaurant[] = await new RestaurantsCrawler(page).run()
  await browser.close()
  expect(results).toEqual(expect.arrayContaining(expected))
})