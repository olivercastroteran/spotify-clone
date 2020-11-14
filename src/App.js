import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Home, Favorites, User, Playlist, NotFound } from './views';
import Sidebar from './components/sidebar/Sidebar';
import Player from './components/player/Player';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentPlaylist = useSelector((state) => state.music.playlists[0]);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <Player currentPlaylist={currentPlaylist} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/user" component={User} />
          <Route path="/playlist/:id" component={Playlist} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
