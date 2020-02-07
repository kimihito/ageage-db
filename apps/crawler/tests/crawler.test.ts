import { Crawler } from '../src/crawler'
import { Restaurant } from '../src/restaurant'
import * as path from 'path'
import { pathToFileURL  } from 'url'

const expected = [
  {
    name: '肉汁あふれる手作りハンバーグ ばくばく亭',
    address: '中頭郡北谷町吉原315-1',
    tel: '098-926-6888',
    open: '11：30～15：00, 17：00～20：00',
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
  },

]

test('crawler gets restaurants', async () => {
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/detail.htm')}`).toString()
  const results: Restaurant[] = await new Crawler(url).run()
  expect(results).toEqual(expect.arrayContaining(expected))
})
