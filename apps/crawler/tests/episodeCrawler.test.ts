import { EpisodeCrawler } from '../src/episodeCrawler'
import { Episode } from '../src/episode'
import * as path from 'path'
import { pathToFileURL } from 'url'
import puppeteer from 'puppeteer'

const expected = [
    {
      category: '激辛',
    },
    {
      category: 'あんかけ',
    },
    {
      category: '魚汁',
    },
    {
      category: 'チーズ料理',
    },
    {
      category: '新年会',
      onAirDate: '2020-01-31'
    },
    {
      category: 'お鍋第2弾',
      onAirDate: '2020-01-31'
    },
    {
      category: '蒸し料理',
      onAirDate: '2020-01-31'
    },
    {
      category: '肉料理',
      onAirDate: '2020-01-31'
    },
    {
      category: '肉料理',
      onAirDate: '2020-01-31'
    },
    {
      category: '沖縄そば 中部編',
      onAirDate: '2020-01-31'
    },
    {
      category: 'エビフライ',
      onAirDate: '2020-01-31'
    },
    {
      category: '魚のバター焼き第2弾',
      onAirDate: '2020-01-31'
    },
    {
      category: 'たまご料理',
      onAirDate: '2020-01-31'
    },
    {
      category: 'みそ汁第2弾',
      onAirDate: '2020-01-31'
    },
    {
      category: 'ピザ第2弾',
      onAirDate: '2020-01-31'
    },
    {
      category: '煮付け第2弾',
      onAirDate: '2020-01-31'
    },
    {
      category: 'インドカレー',
      onAirDate: '2020-01-31'
    },
    {
      category: 'スタミナ料理',
      onAirDate: '2020-01-31'
    },
    {
      category: '担々麺',
      onAirDate: '2020-01-31'
    },
    {
      category: 'タコライス',
      onAirDate: '2020-01-31'
    },
    {
      category: 'チキン',
      onAirDate: '2020-01-31'
    }
]

const launchArgs: puppeteer.ChromeArgOptions = {
  args: [
    '--disable-setuid-sandbox',
    '--no-sandbox',
  ]
}

test("episodeCrawler gets episodes", async () => {
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/index.htm')}`).toString()
  const results = await new EpisodeCrawler(page, url).run()
  await browser.close()
  expect(results).toEqual(expect.arrayContaining(expected))
})
