import { Restaurant } from "./restaurant";

export type Episode = {
  theme: string
  onAirDate: string
  restaurants?: Restaurant[]
}