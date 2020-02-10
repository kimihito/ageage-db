import { EpisodeCrawler } from '../src/episodeCrawler'
import { Episode } from '../src/episode'
import * as path from 'path'
import { pathToFileURL } from 'url'
import puppeteer from 'puppeteer'

const launchArgs: puppeteer.ChromeArgOptions = {
  args: [
    '--disable-setuid-sandbox',
    '--no-sandbox',
  ]
}


const episode: Episode = {
  theme: 'ハンバーグ',
  onAirDate: '2017年11月17日'
}

test("episodeCrawler gets episodes", async () => {
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/detail.htm')}`).toString()
  const result = await new EpisodeCrawler(page, url).run()
  console.log(result)
  await browser.close()
  expect(result).toEqual(episode)
})
