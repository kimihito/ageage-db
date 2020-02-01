import { Crawler, Restaurant } from '../src/crawler'
import * as path from 'path'
import { pathToFileURL  } from 'url'
test('crawler gets restaurant name', async () => {
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/detail.htm')}`).toString()
  const results: Restaurant[] = await new Crawler(url).run()
  expect(results.map(result => result.name)).toEqual(expect.arrayContaining(['肉汁あふれる手作りハンバーグ ばくばく亭', '鳥と卵の専門店 鳥玉 泉崎店', 'トマト＆オニオン 那覇安岡店']))
})
