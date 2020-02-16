export type Episode = {
  id: number,
  theme: string,
  onAirDate: string
}

export type Restaurant = {
  id: number,
  name: string,
  address: string,
  tel: string,
  open?: string,
  close?: string,
  episodeId: number
}
