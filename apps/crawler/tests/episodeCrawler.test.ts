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

test("episodeCrawler gets episode", async () => {
  const episode: Episode = {
    theme: 'ハンバーグ',
    onAirDate: '2017年11月17日'
  }
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/detail.htm')}`).toString()
  await page.goto(url)
  const result = await new EpisodeCrawler(page).run()
  await browser.close()
  expect(result).toEqual(episode)
})

test("episodeCrawelr gets episode from special layout", async () => {
  const episode: Episode = {
    theme: '焼きそば',
    onAirDate: '2018年5月18日'
  }
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  const url = pathToFileURL(`${path.resolve('./tests/fixtures/unuse_default_layout_detail.htm')}`).toString()
  await page.goto(url)
  const result = await new EpisodeCrawler(page).run()
  await browser.close()
  expect(result).toEqual(episode)
})
