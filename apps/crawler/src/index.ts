import { EpisodeCrawler } from './episodeCrawler'
import { EpisodePathsCrawler } from './episodePathsCrawler'
import * as path from 'path'
import puppeteer from 'puppeteer'
import { pathToFileURL  } from 'url'

const launchArgs: puppeteer.ChromeArgOptions = {
  args: [
    '--disable-setuid-sandbox',
    '--no-sandbox',
  ]
}

const BASEURL = `https://www.otv.co.jp/ageage/bk`

const currentPage = (path: string): string => {
  return `${BASEURL}/${path}`
}

const episodes: Episode[] = []

const currentIndexPage = (index: number): string => {
  return `${BASEURL}/index.cgi?pline=${index}`
}

const main = async () => {
  try {
    let index = 0
    const browser = await puppeteer.launch(launchArgs)
    const page = await browser.newPage()

    while (true) {
      console.log(currentIndexPage(index))
      const paths = await new EpisodePathsCrawler(page, currentIndexPage(index)).run()
      console.log(paths)
      for (let path of paths) {
        const episode = await new EpisodeCrawler(page, currentPage(path)).run()
        console.log(episode)
        if (episode) episodes.push(episode)
      }
      break
    }

    console.log(episodes)

    await browser.close()

    console.log('fin')

  } catch {

  }
}

main()
