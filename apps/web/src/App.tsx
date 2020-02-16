import * as React from 'react';
import { Episode, Restaurant } from './entities'
import Header from './Header'
import EpisodeList from './EpisodeList'
import './App.css';

const isDevelopment = process.env.NODE_ENV === "development"

console.log(process.env)

const db = require(`${isDevelopment ? './__mocks__/db.json' : ''}`)

interface Props {}
interface State {
  episodes: Episode[],
  restaurants: Restaurant[]
}

export default class App extends React.Component<Props, State> {
  state = {
    episodes: db["episodes"],
    restaurants: db["restaurants"]
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <EpisodeList episodes={this.state.episodes} />
      </React.Fragment>
    );
  }
}
