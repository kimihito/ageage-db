export type Episode = {
  id: number,
  theme: string,
  onAirDate: string
  restaurants: Restaurant[]
}

export type Restaurant = {
  id: number,
  name: string,
  address: string,
  tel: string,
  open?: string,
  close?: string
}
