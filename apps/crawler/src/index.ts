import { EpisodeCrawler } from './episodeCrawler'
import { EpisodePathsCrawler } from './episodePathsCrawler'
import { Episode } from './episode'
import puppeteer from 'puppeteer'
import lowdb from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { RestaurantsCrawler } from './restaurantsCrawler'


const adapter = new FileAsync<Episode[]>('db.json')
const db = lowdb(adapter)
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
  const browser = await puppeteer.launch(launchArgs)
  try {
    (await db).defaults({ episodes: [] }).write()
    let index = 0
    const page = await browser.newPage()

    while (true) {
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
          if (await data.find({onAirDate: episode.onAirDate}).value()) {
            await data.find({onAirDate: episode.onAirDate}).assign(episode).write()
          } else {
            await data.push(episode).write()
          }
        }
      }
    }

    console.log('fin')

  } catch(error) {
    console.error(error)
  } finally {
    await browser.close()
  }
}

main()
