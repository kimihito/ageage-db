import puppeteer from 'puppeteer'

export class EpisodePathsCrawler {
    public paths: string[] = []
    constructor(private page: puppeteer.Page, private url: string) {}

    async run(): Promise<string[]> {
        await this.page.goto(this.url)
        const paths: (string | null)[] = await this.page.$$eval('a.ToDetail', nodes => nodes.map(node => node.getAttribute('href')))
        const nonNullPaths = paths.filter<string>((path): path is string => typeof path === "string")
        this.paths.push(...nonNullPaths)
        return this.paths
    }
}