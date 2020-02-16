import { EpisodeCrawler } from './episodeCrawler'
import { EpisodePathsCrawler } from './episodePathsCrawler'
import { Episode } from './episode'
import puppeteer from 'puppeteer'
import lowdb from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { RestaurantsCrawler } from './restaurantsCrawler'


const adapter = new FileAsync<Episode[]>('./db.json')
const db = lowdb(adapter)
const launchArgs: puppeteer.ChromeArgOptions = {
  args: [
    '--disable-setuid-sandbox',
    '--no-sandbox',
  ]
}

const isDevelopment = process.env.NODE_ENV === "development"

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
    (await db).defaults({ episodes: [] }).write()
    let index = 0
    const browser = await puppeteer.launch(launchArgs)
    const page = await browser.newPage()

    while (true) {
      if (index === 20) break // debug
      console.log(currentIndexPage(index))
      const paths = await new EpisodePathsCrawler(page, currentIndexPage(index)).run()
      if (!paths.length) break
      index += 20
      for (let path of paths) {
        console.log(`goto ${currentPage(path)}...`)
        await page.goto(currentPage(path))
        const episode = await new EpisodeCrawler(page).run()
        if (episode) {
          episode.restaurants = await new RestaurantsCrawler(page).run()
          episodes.push(episode)
          const data: any = (await db).get('episodes')
          await data.push(episode).write()
        }
      }
    }

    console.log(episodes)
    await browser.close()

    console.log('fin')

  } catch(error) {
    console.error(error)
  }
}

main()
