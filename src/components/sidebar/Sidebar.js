import './Sidebar.scss';
import { ReactComponent as SpotifyIcon } from '../../assets/images/spotify.svg';
import { ReactComponent as ProIcon } from '../../assets/images/disc.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as FavoriteIcon } from '../../assets/icons/favorite.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { Link, NavLink } from 'react-router-dom';
import Playlist from '../music/playlist/Playlist';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const playlists = useSelector((state) => state.music.playlists);

  return (
    <div className="sidebar">
      <Link to="/">
        <h1 className="sidebar__title">
          <SpotifyIcon />
          <span>
            Spotify<small>clone</small>
          </span>
        </h1>
      </Link>

      <nav className="sidebar__links">
        <NavLink exact to="/" className="sidebar__links--item">
          <HomeIcon />
          <span>Home</span>
        </NavLink>

        <NavLink to="/favorites" className="sidebar__links--item">
          <FavoriteIcon />
          <span>Favorites</span>
        </NavLink>

        <NavLink to="/user" className="sidebar__links--item">
          <UserIcon />
          <span>User</span>
        </NavLink>
      </nav>

      <div className="sidebar__playlists">
        <h4>PLAYLISTS</h4>
        {playlists.map((playlist) => (
          <Playlist key={playlist.id} title={playlist.title} />
        ))}
      </div>

      <div className="sidebar__pro">
        <ProIcon />
        <Link to="/pro" className="sidebar__pro--btn">
          PRO
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
