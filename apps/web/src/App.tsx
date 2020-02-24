import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Episode, Restaurant, RestaurantWithEpisode } from './entities'
import Header from './components/Header'
import RestaurantList from './components/RestaurantList'
import './App.css';

const App: React.FC = () => {

  const [restaurants, setRestaurants] = useState<RestaurantWithEpisode[]>([])
  useEffect(() => {
    const fetchData = async() => {
      const result = await axios("https://kimihito.github.io/ageage-db/db.json")
      const nestedRestaurants: RestaurantWithEpisode[] = result.data.episodes.map((e: Episode) => {
        const restaurantsWithEpisode: RestaurantWithEpisode[] = e.restaurants.map((r: Restaurant) => {
          delete e.restaurants
          return { episode: e, ...r }
        })
        return restaurantsWithEpisode
      })
      setRestaurants(([] as RestaurantWithEpisode[]).concat(...nestedRestaurants))
    }

    fetchData()
  }, [])


  return (
    <React.Fragment>
      <Header />
      <RestaurantList restaurants={restaurants} />
    </React.Fragment>
  )
}

export default App
