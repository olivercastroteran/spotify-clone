import { useState } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login, Home, Favorites, User, NotFound } from './views';
import Sidebar from './components/sidebar/Sidebar';
import Player from './components/player/Player';

function App() {
  const [isLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <Player />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/user" component={User} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
