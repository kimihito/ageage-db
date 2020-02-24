import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Episode, Restaurant } from './entities'
import Header from './Header'
import EpisodeList from './EpisodeList'
import './App.css';

const App: React.FC = () => {

  const [episodes, setEpisodes] = useState<Episode[]>([])
  useEffect(() => {
    const fetchData = async() => {
      const result = await axios("https://kimihito.github.io/ageage-db/db.json")
      setEpisodes(result.data.episodes)
    }

    fetchData()
  }, [])


  return (
    <React.Fragment>
      <Header />
      <EpisodeList episodes={episodes} />
    </React.Fragment>
  )
}

export default App
